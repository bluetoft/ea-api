'use strict';
var invitationRepo = require('../repositories/invitationsRepository');
var usersRepository = require('../repositories/usersRepository');
var emailGenerator = require('../../../middleware')
exports.createInvitation = function(educatorId, email){
	return usersRepository.createOrRetrieve(educatorId).then(function(userId){

		return invitationsRepository.createInvite(userId, email).then(function(token){
			emailGenerator.sendInvitation(email,token);
		});
	})
}