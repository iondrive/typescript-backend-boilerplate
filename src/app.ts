import * as express from 'express';
import { join as joinPath } from 'path';

import { JWT_SECRET, BASE_PATH } from '@iondrive/config';
import * as log from '@iondrive/logger';

import { responseMethods, jwt, bodyParser } from './middleware/index';
import routes from './routes';

process.on('unhandledRejection', function(reason: any, promise: Promise<any>) {
  if (reason instanceof Error) {
    log.error(reason, 'unhandledRejection');
    return;
  }

  log.error('unhandledRejection', reason);
});

var app = express();
export default app;

app.use(responseMethods());

/**
 * Assign req.auth if a valid jwt is present.
 */
app.use(jwt({
  secret: JWT_SECRET,
  userProperty: 'auth',
  credentialsRequired: false
}));

app.use(bodyParser.json());

app.use(BASE_PATH, routes);

app.use((req, res, next) => {
  res.notFound();
});

app.use(<express.ErrorRequestHandler>function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.badRequest({
      name: 'ValidationError',
      message: 'The request failed because one of more fields were invalid. See the \'errors\' property for more information.',
      errors: err.errors
    });
  }

  // Caused by express-jwt
  if (err.name === 'UnauthorizedError') {
    return res.unauthorized({
      name: 'Unauthorized',
      message: 'Your JWT is not authorized to perform this action.'
    });
  }

  log.error(err, 'Unhandled express error');
  res.internalServerError();
});