'use strict'

var config = require('../../../../config');
var sql = require('../../sqlDispatcher');
var sqldriver = require('mssql');
var table = config.get('ea:invitationsTable');

exports.createInvite = function(userId, email){
	if(userId === undefined || email === undefined)
		throw new Error('userId and email are required');
	var cols = table.columns;
	var stmt = 'INSERT INTO ' + table.tableName +
				'(' + [cols.userId,cols.email,cols.token,cols.dateCreated,cols.dateExpires,cols.active].join(',') + ')' +
				'VALUES (@userId,@email,@token,@dateCreated,@dateExpires,1) SELECT @@IDENTITY AS Id';
	return sql.query(stmt,createParams(userId,email)).then(function(data){
		console.log(data);
	});
}

function createParams(userId, email) {
	return {
		userId:{
			val: userId,
			type: sqldriver.Int
		},
		email: {
			val: email,
			type: sqldriver.NVarChar,
		},
		dateCreated: {
			val: new Date(),
			type: sqldriver.DateTime
		},
		dateExpires: {
			val: new Date().setDate(new Date().getDate() + 365),
			type: sqldriver.DateTime
		},
		token: {
			val: Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2),
			type: sqldriver.NVarChar
		}			
	}
}