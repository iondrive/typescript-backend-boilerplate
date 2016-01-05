import { assign } from 'lodash';
import { REDIS_AUTHORITY, QUEUE_PREFIX } from '@iondrive/config';
import * as kue from 'kue';

// import sendEmail from './workers/sendEmail';

var [host, port] = REDIS_AUTHORITY.split(':');

export var main: kue.Queue;

export function setup(): Promise<void> {
  main = kue.createQueue({
    prefix: QUEUE_PREFIX,
    redis: {
      host: host,
      port: +port
    }
  });

  // main.process('sendEmail', sendEmail);

  return Promise.resolve();
};