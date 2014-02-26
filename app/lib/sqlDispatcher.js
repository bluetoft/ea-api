'use strict';

var q = require('q');
var sql = require('mssql');
var config = require('../../config')

exports.query = function(stmt, params) {
  var deferred = q.defer();
  
  console.log()
  var conn = new sql.Connection(config.get('sqlConnection'), function (err){
    
    if(err) {
      console.log(err)
      deferred.reject(err);
    } else {
      var request = conn.request();
      if(params){
        for(var item in params){
          request.input(item, params[item])
        }
      }
      request.query(stmt, function(error, recordset) {
        deferred.resolve(recordset);
      })
    }
  });
 
  return deferred.promise;
};

