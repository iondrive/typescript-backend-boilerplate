import { QUEUE_PREFIX } from '@iondrive/config';
import * as Promise from 'bluebird';

import * as queue from '../../lib/queue';
import { default as redis } from '../../lib/redis';

exports.setup = () => {
  return exports.cleanup()
  .then(queue.setup);
};

exports.cleanup = () => {
  return Promise.fromNode(callback => {
    if (!queue.main || queue.main.shuttingDown) return callback();
    queue.main.shutdown(callback);
  })
  .then(() => {
    return redis.keys(QUEUE_PREFIX + ':*')
    .then(keys => {
      return Promise.all(keys.map(key => {
        return redis.del(key);
      }));
    });
  });
};