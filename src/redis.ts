import { REDIS_AUTHORITY } from '@iondrive/config';
import * as log from '@iondrive/logger';
import * as Promise from 'bluebird';

// TODO: Add definition
var redisPromisify = require('promise-redis');

var redis: any = redisPromisify((resolver: any) => {
  return new Promise(resolver);
});

var [host, port] = REDIS_AUTHORITY.split(':');

var client = redis.createClient(+port, host);
export default client;

client.on('error', log.error);