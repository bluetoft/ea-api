'use strict';

var sw = require('../../swagger/common/node/swagger.js');
var eaSessionsMediator = require('../lib/ea/mediators/sessionsMediator');
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
    eaSessionsMediator.deleteSessions(req.params.sessionId);
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
      sw.headerParam('Authorization', 'Authorization header', 'string', true)
    ],
    //'errorResponses' : [swe.invalid('input')],
    'nickname' : 'postSessions'
  },
  'action': function (req, res, next) {
    return eaSessionsMediator.postSessions(req)
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



