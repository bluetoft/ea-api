'use strict';

var config = require('./config');
var express = require('express');
var swaggerConfig = require('./app/swaggerConfig');
var errorHandler = require('./app/middleware/errorHandler');
var responseFormatter = require('./app/middleware/responseFormatter');
console.log(responseFormatter.toString());
var app = setupExpress();

if (app.settings.env !== 'test') {
  var port = config.get('port') || 3000;
  app.listen(port);
  console.log('Server listening on port %d.', port);
}

module.exports = app;

function setupExpress() {
  var app = express();
  app.use(express.urlencoded());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(responseFormatter);
  app.use(errorHandler);
  //Configure routes.
  swaggerConfig.setupSwagger(app, express);
  return app;
}
