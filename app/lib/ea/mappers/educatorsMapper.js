'use strict';
var config = require('../../../../config')
var _ = require('lodash');

module.exports = function(results, req) {
	var table = config.get('ea:educatorsTable');
	var cols = table.columns;var educators = [];
	if ((results && results.results) || results.length){
		_.map(results.results || results, function(edu) {
			var ssn = edu[cols.ssn];
			if(ssn){
				ssn = '###-##-' + ssn.split('-').pop();
			}
			educators.push({
				id: edu[cols.id],
				firstName: edu[cols.firstName],
				lastName: edu[cols.lastName],
				emailAddress: edu[cols.emailAddress],
				ssn: ssn,
				license: edu[cols.licence],
				stateOfLicence: edu[cols.stateOfLicence]
			})
		})
		return req.params.educatorId 
			? { results: educators[0] } 
			: { results: educators, total: results.total.count }
	}

	return { };
};

