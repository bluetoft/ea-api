'use strict';

var config = require('../../../../config');

exports.translatePostRequest = function(req) {
  var authBody = getAuthBody(req);
  authBody.RememberMe = req.body.rememberMe;

  return getHttpOptions(req, 'postSessionsPath', authBody);
};

exports.translateDeleteRequest = function(req) {
  return getHttpOptions(req, 'deleteSessionPath', 'DELETE');
};

function getHttpOptions(req, empowerPathName, postData) {
  return {
    hostname: config.get('empower:hostname'),
    port: config.get('empower:port'),
    path: config.get('empower:basepath') + config.get('empower:sessions:' + empowerPathName),
    method: 'POST',
    headers: {
      'client-ip': req.ip,
      'Content-Type': 'application/json'
    },
    body:  postData
  };
}

function getAuthBody(req) {
  var authHeader = req.headers.authorization || '';
  var token=authHeader.split(/\s+/).pop() || '';
  var auth=new Buffer(token, 'base64').toString();
  var parts=auth.split(/:/);
  var username=parts[0];
  var password=parts[1] || '';

  return { 
    'Username': username,
    'Password': password,
    'IpAddress': req.ip
  };

}