'use strict';

/*
Turns a criteria array:

[{ key: 'q[FirstName]',
  op: 'eq',
  value: '\'John\''
},
{ key: 'q[LastName]',
  op: 'eq',
  value: '\'Doe\''
}]

 into a query string:

 '?q[FirstName]=John&q[LastName]=Doe';
*/
exports.build = function(criteria) {
  var queryString = '';

  if(criteria && criteria.length > 0) {
    queryString = '?';
    for (var i=0; i < criteria.length; i++) {
      if (criteria[i].op === 'eq') {
        if (queryString.length > 1)
          queryString += '&';
        queryString += criteria[i].key + '=' + removeQuotes(criteria[i].value);
      }
    }
  }
  return queryString;
};

function removeQuotes(value) {
  if (value.charAt(0) === '\'') {
    value = value.slice(1);
  }
  if(value.charAt(value.length - 1) === '\'') {
    value = value.slice(0, -1);
  }
  return value;
}
