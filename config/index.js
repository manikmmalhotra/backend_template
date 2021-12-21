'use strict';

const config = {
  development: {
    mongoDb: 'mongodb+srv://etcetc',
    port: process.env.PORT || 8001,
    sentryDSN: 'https://something@sentry.io/something',
    jwt: {
      secrets: 'amaasdfandy1203',
      expiresIn: 'a365asdfasd' // else we can omit the expiresIn key for unlimited expiry
    }
  }
};

const appSettings = {...config[process.env.NODE_ENV || 'development']};

module.exports = appSettings;