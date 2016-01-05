
import * as Promise from 'bluebird';

exports.setup = () => {
  return exports.cleanup();
};

exports.cleanup = () => {
  return Promise.resolve();
};