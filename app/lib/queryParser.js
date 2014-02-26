'use strict';

module.exports = function(configuration){
  var mapKey = function(inputKey){
    return configuration[inputKey] || inputKey;
  };
  return {
    parse: function(query){
      var criteria = [];
      if(query.q) {
        var args = query.q.split(/ and /i);
        args.forEach(function(arg){
          var parts = arg.split(/ eq /i);
          criteria.push({
            key: mapKey(parts[0]),
            op: 'eq',
            value: parts[1]
          });
        });
      }
      return criteria;
    }
  };
};