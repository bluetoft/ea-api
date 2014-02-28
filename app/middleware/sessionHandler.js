'use strict'
var repo = require('../lib/ea/repositories/sessionsRepository');

module.exports = function(req, res, next) {
	req.sessionId = req.headers['auth-s'];
	if(req.sessionId && req.sessionId !== ''){
		var response = repo.getSession(req);
		response.then(function(session){
			req.session = session;
			res.session = session;
			next();
		})
	}else
	next();
}