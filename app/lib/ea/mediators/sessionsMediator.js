'use strict';

var translator = require('../translators/sessionsTranslator');
var dispatcher = require('../../sqlDispatcher');
var mapper = require('../mappers/sessionsMapper');

exports.postSessions = function(req) {
  return executeMediation(req, translator.translatePostRequest);
};

exports.deleteSessions = function(req) {
  return executeMediation(req, translator.translateDeleteRequest);
};

function executeMediation(req, translatorFunc) {
  var requestProperties = translatorFunc(req);
  var responsePromise = dispatcher.dispatch(requestProperties, requestProperties.body);
  var mappedData = responsePromise.then(function(result) {
    return mapper(result);
  });
  return mappedData;
}
