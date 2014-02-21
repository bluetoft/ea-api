'use strict';

var uuid = require('node-uuid');

module.exports = function (err, req, res, next) {
  console.log(err);
  //'next' unused but needed for express.
  /* jshint unused: false*/
  if(!err) return;
  var errorResponse = {};
  errorResponse.status = err.status || 500;
  errorResponse.code = err.code || 500;
  errorResponse.message = err.friendlyMessage || 'Server error occurred.';
  errorResponse.developerMessage = err.message || 'Undefined server error.';
  errorResponse.stack = err.stack;
  errorResponse.tracking = err.tracking || uuid.v1();

  //TODO: Log this when we figure that out
  res.json(errorResponse, err.status || 500);
};