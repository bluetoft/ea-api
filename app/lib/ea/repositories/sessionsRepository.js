'use strict';

var config = require('../../../../config');
var sql = require('../../sqlDispatcher');
var sqldriver = require('mssql');
var crypto = require('../../cryptography');

var queryOptions = {
    usersTable: config.get('ea:usersTable'),
    sessionsTable: config.get('ea:sessionsTable'),
  };

exports.authenticate = function(req) {
  var authBody = getAuthBody(req);
  var table = queryOptions.usersTable;
  var stmt =  'SELECT ' + table.columns.username + ', ' + table.columns.id + ', ' + table.columns.salt + ', ' + table.columns.password + '\
               FROM ' + table.tableName +  '\
               WHERE '+ table.columns.username +' = @username ' + '\
               AND '+ table.columns.active + ' = 1';
  var promise = sql.query(
                            stmt,
                          {
                            'username': { val: authBody.username, type: sqldriver.NVarChar },
                            'password': { val: authBody.password, type: sqldriver.NVarChar }
                          });
  var success = promise.then(function(result){
    var user = result[0];
    if(user){
      var valid = validatePassword(authBody.password, user)
      if(valid){
        var sessionId = createSession(user).then(function(results){
          return {
            user: user,
            valid: valid,
            sessionId: crypto.encrypt(results[0].sessionId)
          }
        });
        return sessionId;
      }
    }
  });
  return success
};

exports.getSession = function(req){
  var session = crypto.decrypt(req.sessionId);
  var table = queryOptions.sessionsTable;
  var cols = table.columns;
  var promise = sql.query(
    'SELECT * from ' + table.tableName +
    ' WHERE ' + cols.id + '  = @Id \
      AND ' + cols.expiresOn + ' > GETDATE() ',
      { 'id' : { val: session, type: sqldriver.UniqueIdentifier }});
  
  return promise.then(function(rsp) {
    if(rsp.length)
      return session = rsp[0];
  });
}

exports.endSession = function(sessionId){
  var session = crypto.decrypt(sessionId);
  var table = queryOptions.sessionsTable;
  var cols = table.columns;
  sql.query(
    'DELETE from ' + table.tableName +
    ' WHERE ' + cols.id + '  = @Id ',
      { 'id' : { val: session, type: sqldriver.UniqueIdentifier }});
}

function createSession(user) {
  function addCol(cols){ cols.join(', '); }
  var sess = queryOptions.sessionsTable;
  var col = sess.columns;
  var now = new Date();
  var userId = user[queryOptions.usersTable.columns.id];
  var stmt = 'declare @id uniqueidentifier \
              Set @id = NEWID() \
              DELETE from ' + sess.tableName + ' WHERE  [' + col.userId + '] = ' + userId +
              'INSERT INTO ' + sess.tableName + '('  + [col.id,col.userId,col.createdOn,col.expiresOn].join(',') + ') \
              Values (@id,' + userId + ',\
               getdate(), \
               dateadd(hh, 2, getdate())) \
              SELECT @id as sessionId';
  var promise = sql.query(stmt);
  var response = promise.then(function(id){
    return id;
  })
  return promise;
}

function validatePassword(password, user){
  return crypto.compare(user.password, password + ':' + user.salt)
}

exports.translateDeleteRequest = function(req) {
  return getQueryOptions(req, 'deleteSessionPath', 'DELETE');
};

function getAuthBody(req) {
  var authHeader = req.headers.authorization || '';
  var token=authHeader.split(/\s+/).pop() || '';
  var auth=new Buffer(token, 'base64').toString();
  var parts=auth.split(/:/);
  var username=parts[0];
  var password=parts[1] || '';

  return { 
    'username': username,
    'password': password,
    'ipAddress': req.ip
  };

}