const path = require('path');

module.exports = {
  NODE_ENV: 'development',
  NODE_CONFIG_PATH: path.join(__dirname, '../lib/config.js'),
  NODE_LOG_LEVEL: 'trace',

  APP_BASE_PATH: '/api',
  APP_PORT: '3000',

  APP_JWT_SECRET: 'secret',
  APP_JWT_TTL: '7d',

  APP_REDIS_AUTHORITY: 'localhost:6379',

  APP_QUEUE_PREFIX: 'd',

  APP_MAIL_SERVER_HOST: 'smtp.mailgun.org',
  APP_MAIL_SERVER_PORT: 587,
  APP_MAIL_SERVER_USERNAME: 'change@sandbox.mailgun.org',
  APP_MAIL_SERVER_PASSWORD: 'password',
  APP_MAIL_SENDER: 'Boilerplate (DEVELOPMENT)<noreply@boilerplate.co.uk>',

  APP_WEBSITE_URL: 'http://localhost:3001',

  APP_EMAIL_TOKEN_TTL: '24h'
};