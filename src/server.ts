import { Server } from 'http';

import { PORT } from '@iondrive/config';
import * as log from '@iondrive/logger';
import * as Promise from 'bluebird';

import app from './app';
import { main as queue, setup as setupQueue } from './queue';

var server: Server;

setupQueue()
.then(() => {
  server = app.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    log.info('Server listening at http://%s:%s', host, port);
  });
})
.catch(err => {
  log.fatal(err, 'Failed to start the server');
  exit(0);
});

/**
 * Exit the process, but wait for the event loop to empty.
 */
function exit(exitCode: number) {
  setImmediate(() => {
    process.exit(exitCode);
  });
}

function stopServer(callback: (err?: Error) => void) {
  if (!server) return callback();

  server.close((err: Error) => {
    if (err) {
      log.error(err, 'Server stopped with error');
    } else {
      log.info('Server stopped');
    }

    callback(err);
  });
}

function stopQueue(callback: (err?: Error) => void) {
  queue.shutdown(2500, '', (err: Error) => {
    if (err) {
      if (typeof err === 'string') err = new Error(<any>err);
      log.error(err, 'Queue stopped with error');
    } else {
      log.info('Queue stopped');
    }
    callback(err);
  });
}

/**
 * Attempt to shutdown the process gracefully.
 */
function gracefulExit(exitCode: number) {
  log.info('Shutting down');

  stopServer(err => {
    if (err) exitCode |= 2;

    stopQueue(err => {
      if (err) exitCode |= 4;

      exit(exitCode);
    });
  });

  setTimeout(() => {
    log.warn('Forced shutdown');
    exit(exitCode | 8);
  }, 2500);
}

// Ctrl-C
process.once('SIGINT', () => {
  // nodemon seems to send a second SIGINT which interfers with async cleanup, so
  // we ignore any subsequent signals. The process will be forcefully exited
  // shortly regardless.
  process.on('SIGINT', () => {});

  console.log();
  log.info('Received SIGINT signal');

  gracefulExit(0);
});

// https://github.com/Automattic/kue#graceful-shutdown
process.on('SIGTERM', () => {
  log.info('Received SIGTERM signal');

  gracefulExit(0);
});

process.on('uncaughtException', (err: Error) => {
  log.fatal(err, 'Uncaught exception');

  gracefulExit(1);
});

process.on('exit', (code: number) => {
  log.info('Process exited with code ' + code);
});
