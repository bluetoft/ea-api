'use strict';

var sw = require('../../swagger/common/node/swagger.js');
var eaEducatorMediator = require('../lib/ea/mediators/educatorsMediator');
var swe = sw.errors;

exports.getEducators = {
  'spec': {
    'description' : 'Deletes a session resource',
    'path' : '/educators',
    'notes' : 'Educators Resource',
    'summary' : '',
    'method' : 'GET',
    'params' : [
      sw.queryParam ('firstName', 'First Name', 'string'),
      sw.queryParam ('lastName', 'Last Name', 'string'),
      sw.queryParam ('emailAddress', 'Email Address', 'string'),
      sw.queryParam ('ssn', 'Social Security Number', 'string'),
      sw.queryParam ('page', 'Page of Result set to retrieve', 'string'),
      sw.queryParam ('pageSize', 'Size of Pages to retrieve', 'string')
      ],
    'nickname' : 'getUsers'
  },
  'action' : function(req, res, next) {
    return eaEducatorMediator.getEducators(req, res)
      .then(function(data){
        res.results = data.results;
        res.total = data.total;
        res.status = 200;
        next();
      })
      .fail(function(data){
        next(data);
      })
  }
};
exports.getEducator = {
  'spec': {
    'description' : 'Deletes a session resource',
    'path' : '/educators/{educatorId}',
    'notes' : 'Single Educator Resource',
    'summary' : '',
    'method' : 'GET',
    'params' : [sw.pathParam('educatorId', 'Educator Identifier', 'int')],
    'nickname' : 'getUser'
  },
  'action' : function(req, res, next) {
    return eaEducatorMediator.getEducator(req, res)
      .then(function(data){
        res.results = data.results;
        res.status = 200;
        next();
      })
      .fail(function(data){
        next(data);
      })
  }
};




