'use strict'

var config = require('../../../../config');
var sql = require('../../sqlDispatcher');
var sqldriver = require('mssql');

var queryOptions = {
	table: config.get('ea:educatorsTable:tableName'),
	columns: config.get('ea:educatorsTable:columns')
}
exports.get = function(req){
	var stmt = 'SELECT * FROM ' + queryOptions.table + ' WHERE ' + queryOptions.columns.id + ' = @id';
	return sql.query(stmt, mapParams(req.params)).then(function(educator){
		return educator;
	})
}

exports.query = function(req){
	var params = req.query;
	var stmt = ' from ' + queryOptions.table + ' WHERE 1=1 ';
	if (params.firstName){
		stmt += 'AND ' + queryOptions.columns.firstName + ' like \'%\' + @firstName + \'%\' ';
	}
	if (params.lastName){
		stmt += 'AND ' + queryOptions.columns.lastName + ' like \'%\' + @lastName + \'%\' ';
	}
	if (params.emailAddress){
		stmt += 'AND ' + queryOptions.columns.emailAddress + ' like \'%\' + @emailAddress + \'%\' ';
	}
	if (params.ssn){
		stmt += 'AND ' + queryOptions.columns.ssn + ' like \'%\' + @ssn + \'%\' ';
	}
	var mappedParams = mapParams(params);
	var countPromise = sql.query('SELECT count(*) as count ' + stmt, mappedParams);
	var returnVal = {};
	var count = countPromise.then(function(result){
		try{
			returnVal.total = result[0];
			stmt = 'SELECT * From \
				(\
					SELECT ' + [	queryOptions.columns.id, 
									queryOptions.columns.firstName, 
									queryOptions.columns.lastName, 
									queryOptions.columns.ssn, 
									queryOptions.columns.emailAddress, 
									queryOptions.columns.userId].join(',') + 
					', ROW_NUMBER() OVER (ORDER BY Id) AS RowNumber \
					' + stmt + 
					') as RowConstrained \
				WHERE RowNumber BETWEEN ((@page * @pageCount) - @pageCount + 1) AND (@page * @pageCount)\
			 ';
			var resultsPromise = sql.query(stmt, mappedParams);
			var rslts = resultsPromise.then(function(results){
				returnVal.results = results;
				return returnVal;
			});

			return rslts;
		}
		catch(err){
			console.log(err);
		}
	});
	return count;
}

function mapParams(params){
	return {
		id:{
			val: params.educatorId,
			type: sqldriver.Int
		},
		firstName: {
			val: params.firstName,
			type: sqldriver.NVarChar,
		},
		lastName: {
			val: params.lastName,
			type: sqldriver.NVarChar,
		},
		emailAddress: {
			val: params.emailAddress,
			type: sqldriver.NVarChar,
		},
		page:{
			val: params.page || 1,
			type: sqldriver.Int
		},
		pageCount: {
			val: params.pageSize || 10,
			type: sqldriver.Int
		},
		ssn: {
			val: params.ssn,
			type: sqldriver.NVarChar
		}
	}
}