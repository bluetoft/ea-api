'use strict';

var swagger = require('../swagger/common/node/swagger.js');
var fs = require('fs');

function setupSwagger(app, express) {
  console.log('---------------------------------');
  console.log('setting up swagger');

  swagger.setAppHandler(app);
  //Error handler set in Express.
  swagger.setErrorHandler(null);

  addModels(swagger);
  addResources(swagger);

  // Configures the app's base path and api version.
  var baseUrl = '';
  swagger.configure(baseUrl, '0.0.1');

  // Serve up swagger ui at /docs via static route
  var docsHandler = express.static(__dirname + '/../swagger/swagger-ui-1.1.13/');
  app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
    if (req.url === '/docs') { // express static barfs on root url w/o trailing slash
      res.writeHead(302, { 'Location' : req.url + '/' });
      res.end();
      return;
    }
    // take off leading /docs so that connect locates file correctly
    req.url = req.url.substr('/docs'.length);
    return docsHandler(req, res, next);
  });

  console.log('swagger configured');
  console.log('---------------------------------');
}

function processResourceFile(swagger, file) {
  var resourceFile = require(file);

  for(var key in resourceFile)
  {
    if(key.substr(0, 3) === 'get') {
      swagger.addGET(resourceFile[key]);
    }
    else if(key.substr(0, 3) === 'put') {
      swagger.addPUT(resourceFile[key]);
    }
    else if(key.substr(0, 4) === 'post') {
      swagger.addPOST(resourceFile[key]);
    }
    else if(key.substr(0, 6) === 'delete') {
      swagger.addDelete(resourceFile[key]);
    }
    else {
      console.log('Unknown verb: ' + key);
    }
  }
}

function addResources(swagger) {
  var resourceDir = __dirname + '/resources';

  var files = fs.readdirSync(resourceDir);
  files.forEach(function(file) {
    console.log('Adding resource: ' + file);
    processResourceFile(swagger, resourceDir + '/' + file);
  });
}

function addModels(swagger) {
  var modelDir = __dirname + '/models';

  var files = fs.readdirSync(modelDir);
  files.forEach(function(file) {
    console.log('Adding model: ' + file);
    var modelFile = require(modelDir + '/' + file);
    swagger.addModels(modelFile);
  });
}

exports.setupSwagger = setupSwagger;
