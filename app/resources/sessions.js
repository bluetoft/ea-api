'use strict';

var sw = require('../../swagger/common/node/swagger.js');
var swe = sw.errors;

exports.deleteSessions = {
  'spec': {
    'description' : 'Deletes a session resource',
    'path' : '/sessions/{sessionId}',
    'notes' : 'Deletes the user session',
    'summary' : '',
    'method' : 'DELETE',
    'params' : [sw.pathParam('sessionId', 'SessionId', 'string')],
    'errorResponses' : [swe.invalid('sessionId'), swe.notFound('sessionId')],
    'nickname' : 'deleteSession'
  },
  'action' : function(req, res) {
    res.json(400);
    return;
  }
};

exports.postSessions = {
  'spec': {
    'description' : 'Create a new session.',
    'path' : '/sessions',
    'notes' : 'Notes',
    'summary' : 'Create a new session',
    'method': 'POST',
    'params' : [
      sw.headerParam('Authorization', 'Authorization header', 'string', true),
      sw.bodyParam('rememberMe', 'Option to temporarily disable two-factor auth', 'bool', false)
    ],
    //'errorResponses' : [swe.invalid('input')],
    'nickname' : 'postSessions'
  },
  'action': function (req, res, next) {
    next();
    return;
    return empowerSessionsMediator.postSessions(req)
      .then(function(data) {
        res.results = data.results;
        res.status=201;
        next();
      })
      .fail(function(data) {
        next(data);
      });
  }
};

exports.putSession = {
  'spec': {
    'description' : 'Answer a session login challenge.',
    'path' : '/sessions/{sessionId}',
    'notes' : 'Notes',
    'summary' : 'Answer a session login challenge',
    'method': 'PUT',
    'params' : [
      sw.pathParam('sessionId', 'SessionId', 'string'),
      sw.headerParam('Authorization', 'Authorization header', 'string', true),
      sw.bodyParam('challengeQuestions', 'Challenge questions that need to be validated', 'Question')
    ],
    'errorResponses' : [swe.invalid('sessionId'), swe.notFound('sessionId')],
    'nickname' : 'putSession'
  },
  'action': function (req, res, next) {
    next();
    return;
    return empowerSessionsMediator.putSession(req)
      .then(function(data) {
        res.results = data.results;
        res.status=200;
        next();
      })
      .fail(function(data) {
        next(data);
      });
  }
};

