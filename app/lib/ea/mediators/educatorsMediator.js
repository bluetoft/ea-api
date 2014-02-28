'use strict';

var repository = require('../repositories/educatorsRepository');
var mapper = require('../mappers/educatorsMapper');

exports.getEducators = function(req, rsp) {
  return executeMediation(req, rsp, repository.query);
};

exports.getEducator = function(req, rsp) {
	return executeMediation(req,rsp, repository.get)
}

function executeMediation(req, rsp, func) {
  var responsePromise = func(req,rsp);

  var mappedData = responsePromise.then(function(result) {
    var results = mapper(result, req);
    rsp.total = results.total;
    rsp.results = results.results;
    return results;
  });
  return mappedData;
}
