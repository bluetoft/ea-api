'use strict';

module.exports = {
  port : '3000',
  sqlConnection: {
    server: 'localhost',
    database: 'sandbox',
    user: 'sandbox',
    password: 'Password1'
  },
  ea: {
  	usersTable: {
  		'tableName': 'Users',
  		'columns': {
  			'username':'username',
  			'password':'password',
  			'active':'active',
  			'salt':'salt',
  			'id':'id'
  		}
  	},
  	sessionsTable: {
  		'tableName':'Sessions',
  		'columns': {
  			'id':'id',
  			'userId':'UserId',
  			'createdOn':'CreatedOn',
  			'expiresOn':'ExpiresOn'
  		}
  	},
  	educatorsTable:{
  		'tableName':'Educators',
  		'columns': {
  			'id':'Id',
  			'firstName':'FirstName',
  			'lastName':'LastName',
  			'emailAddress':'EmailAddress',
  			'ssn':'SocialSecurityNumber',
  			'license':'License',
  			'stateOfLicense':'LicenseState',
  			'userId':'UserId'
  		}
  	},
  	invitationsTable:{
  		'tableName':'Invitations',
  		'columns': {
  			userId: 'UserId',
	  		email: 'Email',
	  		token: 'Token',
	  		dateCreated: 'DateCreated',
	  		dateExpires: 'DateExpires',
  			active: 'Active'
  		}
  	}
  }
};