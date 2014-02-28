'use strict';

var repository = require('../repositories/sessionsRepository');
var dispatcher = require('../../sqlDispatcher');
var mapper = require('../mappers/sessionsMapper');

exports.postSessions = function(req) {
  return executeMediation(req, repository.authenticate);
};

exports.deleteSessions = function(sessionId) {
  return repository.endSession(sessionId);
};

function executeMediation(req, func) {
  var responsePromise = func(req);

  var mappedData = responsePromise.then(function(result) {
    return mapper(result);
  });
  return mappedData;
}
