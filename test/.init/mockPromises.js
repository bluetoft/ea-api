'use strict';

var Q = require('q');

module.exports = {
  buildImmediatelyResolvedPromise: function(data){
    var resolved = Q.defer();
    resolved.resolve(data);
    return resolved.promise;
  },
  buildImmediatelyRejectedPromise: function(data){
    var rejected = Q.defer();
    rejected.reject(data);
    return rejected.promise;
  }
};