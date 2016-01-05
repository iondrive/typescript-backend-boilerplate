import * as express from 'express';

import * as bodyParser from 'body-parser';
import * as jwt from 'express-jwt';
import * as validate from '@iondrive/validation-middleware';
// http://stackoverflow.com/a/475217
validate.addFormat('base64', /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/);

import responseMethods from './responseMethods';

export { bodyParser, jwt, validate, responseMethods };

export function ensureAuth(types: string): express.Handler;
export function ensureAuth(types: string[]): express.Handler;
export function ensureAuth(types: any): express.Handler {
  if (!Array.isArray(types)) types = [types];

  return (req, res, next) => {
    if (!req.auth || types.indexOf(req.auth.type) === -1) return res.unauthorized();
    next();
  };
}