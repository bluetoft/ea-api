'use strict';

module.exports = function(result) {

	var session = {};
  
	session.userId = result.Id;

	if (result){
		session.sessionAuthenticated = true;
		session.userName = result.UserName;
	}
	else{
		var error = new Error('No user found.');
		error.friendlyMessage = 'Could not log in. Please try again later.';
		throw error;
	}

	return { results: session };
};

