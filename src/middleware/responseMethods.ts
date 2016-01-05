import { JWT_TTL, JWT_SECRET } from '@iondrive/config';
import * as express from 'express';
import { sign } from 'jsonwebtoken';

function serializeError(err: Error): ErrorResponse {
  if ((<any>err).custom) {
    return {
      name: err.name,
      message: err.message
    };
  } else {
    return {
      name: err.name
    };
  }
}

export default () => {
  return <express.RequestHandler>function (req, res, next) {
    res.sendData = function () {
      var statusCode: number = 200;
      var data: DataResponse;

      if (arguments.length === 2) {
        statusCode = arguments[0];
        data = arguments[1];
      } else {
        if (typeof arguments[0] === 'number') {
          statusCode = arguments[0];
        } else {
          data = arguments[0];
        }
      }

      res.status(statusCode).send(data);
    };

    res.ok = res.sendData.bind(res, 200);

    res.sendError = function () {
      var statusCode: number = 500;
      var error: ErrorResponse;

      if (arguments.length === 2) {
        statusCode = arguments[0];
        error = arguments[1];
      } else {
        if (typeof arguments[0] === 'number') {
          statusCode = arguments[0];
        } else {
          error = arguments[0];
        }
      }
      if (error instanceof Error) {
        error = serializeError(<Error>error);
      }

      res.status(statusCode).send(error);
    };

    res.badRequest = res.sendError.bind(res, 400);
    res.unauthorized = res.sendError.bind(res, 401);
    res.forbidden = res.sendError.bind(res, 403);
    res.notFound = res.sendError.bind(res, 404);
    res.conflict = res.sendError.bind(res, 409);
    res.authenticationTimeout = res.sendError.bind(res, 419);
    res.tooManyRequests = res.sendError.bind(res, 429);
    res.internalServerError = res.sendError.bind(res, 500);

    res.jwt = (type: string, subject: string, payload?: any) => {
      payload = payload || {};
      payload.type = type;
      var token = sign(payload, JWT_SECRET, { subject: subject, expiresInMinutes: JWT_TTL.asMinutes() });
      res.type('application/jwt').send(token);
    };

    next();
  };
};
