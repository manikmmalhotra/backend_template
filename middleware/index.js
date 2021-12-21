'use strict'

const express = require('express')
const appSettings = require('./../config')
const api = require('../api')
const bodyParser = require('body-parser');
var boom = require('express-boom');
const { celebrate, Joi, errors, isCelebrate } = require('celebrate');
const swaggerUi = require('swagger-ui-express')
const fileUpload = require('express-fileupload')
const swaggerDocument = require('../swagger/swagger.json')
// const sentry = require('@sentry/node')
const { apiResponseGenerator } = require('../init/bootstrap')
const expressValidator = require('../init/validations')
const compression = require('compression')
const middleware = async () => {
  const app = express()

  // configure sentry
  // sentry.init({ dsn: appSettings.sentryDSN })
  // app.use(sentry.Handlers.requestHandler())

  app.use(boom());
  app.use(fileUpload());

  // enable cross domain access
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, visitorid, tempsave')
    next()
  })
  app.use(compression());

  // connect to swagger UI
  app.use('/', swaggerUi.serve)
  app.get('/', swaggerUi.setup(swaggerDocument))

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false, parameterLimit: 10000, limit: 1024 * 1024 * 10 }))

  // parse application/json
  app.use(bodyParser.json({ limit: '30mb' }));
  app.use(apiResponseGenerator);
  expressValidator(app);

  // connect to api
  app.use('/api', api);
  app.use((err, req, res, next) => {
    if (isCelebrate(err)) {
      res.sendValidationError( err.message);
      return
    }
    next();
  });
  
  // app.use((err, req, res, next) => {
  //   logger.warn(err);
  //   if (isProd) Sentry.captureException(err);
  //   return res.status(400).send(err);
  // });
  // register sentry event tracker
  // app.use(sentry.Handlers.errorHandler())
  // add any error handlers last

  return app
}

module.exports = middleware
