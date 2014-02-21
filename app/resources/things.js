'use strict';

exports.getThings = {
  'spec': {
    'description' : 'Gets the things',
    'path' : '/things',
    'notes' : 'Notes',
    'summary' : 'Summary',
    'method': 'GET',
    'nickname' : 'getThings'
  },
  'action': function (req, res, next) {
    var item = {
    	a : 1,
    	b : 2,
    	c : 3
    }
    res.results = [item];
    res.total = 1;
    next();
  }
};

exports.postThings = {
	'spec': {
		'description' : 'Gets the things',
    'path' : '/things',
    'notes' : 'POST to create a new thing.',
    'summary' : 'You can create a new thing with this verb.',
    'method': 'POST',
    'nickname' : 'postThings'
	},
  	'action': function (req, res, next) {
    	next();
  }
};