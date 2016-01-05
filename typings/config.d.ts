declare module '@iondrive/config' {
  interface Duration {
    asMilliseconds(): number;
    toMilliseconds(): number;
    asSeconds(): number;
    toSeconds(): number;
    asMinutes(): number;
    toMinutes(): number;
    asHours(): number;
    toHours(): number;
    asDays(): number;
    toDays(): number;
    asYears(): number;
    toYears(): number;
  }

  var MenuLabConfig: {
    /**
     * The path to mount our API at. The expectation is that this will either be
     * set to '/' for production or '/api' for development/testing, but any
     * valid absolute path will work.
     */
    BASE_PATH: string;

    /**
     * The port the web server should bind to.
     */
    PORT: number;

    JWT_SECRET: string;
    JWT_TTL: Duration;

    COUCH_AUTHORITY: string;
    COUCH_USERNAME: string;
    COUCH_PASSWORD: string;
    COUCH_SECRET: string;
    COUCH_NAMESPACE: string;

    REDIS_AUTHORITY: string;

    QUEUE_PREFIX: string;

    MAIL_SERVER_HOST: string;
    MAIL_SERVER_PORT: number;
    MAIL_SERVER_USERNAME: string;
    MAIL_SERVER_PASSWORD: string;
    MAIL_SENDER: string;

    WEBSITE_URL: string;

    EMAIL_TOKEN_TTL: Duration;
  };
  export = MenuLabConfig;
}
