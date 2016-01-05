export = {
  /**
   * Required for some express middleware
   */
  NODE_ENV: {
    type: 'enum',
    env: 'NODE_ENV',
    values: ['development', 'test', 'production']
  },
  /**
   * Required for @iondrive/config
   */
  NODE_CONFIG_PATH: {
    type: 'string',
    env: 'NODE_CONFIG_PATH'
  },
  /**
   * Required for @iondrive/logger
   */
  NODE_LOG_LEVEL: {
    type: 'enum',
    env: 'NODE_LOG_LEVEL',
    values: ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
  },

  BASE_PATH: {
    type: 'string',
    validator: function (value: string) {
      return /^\/.*$/.test(value);
    }
  },

  PORT: 'integer',

  JWT_SECRET: 'string',
  JWT_TTL: 'duration',

  REDIS_AUTHORITY: 'string',

  QUEUE_PREFIX: 'string',

  MAIL_SERVER_HOST: 'string',
  MAIL_SERVER_PORT: 'integer',
  MAIL_SERVER_USERNAME: 'string',
  MAIL_SERVER_PASSWORD: 'string',
  MAIL_SENDER: 'string'
};