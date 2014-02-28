'use strict';

var q = require('q');
var sql = require('mssql');
var config = require('../../config')

exports.query = function(stmt, params) {
  var deferred = q.defer();
  
  var conn = new sql.Connection(config.get('sqlConnection'), function (err){
    
    if(err) {
      console.log(err)
      deferred.reject(err);
    } else {
      var request = conn.request();
      if(params){
        for(var item in params){
          try{
            request.input(item, params[item].type, params[item].val)
          }
          catch(err){
            console.log(err);
            deferred.reject(err);
          }
        }
      }
      try{
        request.query(stmt, function(error, recordset) {
          if(error){
            console.log(error);
            deferred.reject(error);
          } else{
            deferred.resolve(recordset);
          }
          conn.close();
        })
      }
      catch(err){
        console.log(err);
        deferred.reject(err);
      }
    }
  });
 
  return deferred.promise;
};

