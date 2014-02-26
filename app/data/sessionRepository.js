'use strict';

var tds = require('tds'),
config = require('../../config'),
conn;

var repository = {
	authenticate: function (username, password) {
		conn = new tds.Connection(config.sqlConnection);
		conn.connect(function(error){
			if (error != null) {
				console.error('Received error', error);
			} else {
				console.log('Now connected, can start using');
				var stmt = conn.createStatement('SELECT id from Users where [Username] = $Username AND [Password] = $Password', {
					$Username : username,
					$Password : password
				});
				stmt.on('row', function(row){
					console.log(row.getValue(0));
				});
				stmt.execute();
			}
		});
	}
}
module.exports = repository;

function createConnection(stmt, func) {
	
}