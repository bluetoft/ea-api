'use strict';
var config = require('../../../../config')
module.exports = function(result) {

	var session = {};
	if (result && result.user){
		session.sessionAuthenticated = true;
		session.userName = result.user[config.get('ea:usersTable:columns:username')];
		session.id = result.sessionId
	}
	else{
		var error = new Error('No user found.');
		error.friendlyMessage = 'Could not log in. Please try again later.';
		throw error;
	}

	return { results: session };
};

