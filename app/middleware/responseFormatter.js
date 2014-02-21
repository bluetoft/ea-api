'use strict';

module.exports = function(req, res, next) {
  //'next' unused but needed for express.
  /* jshint unused: false */
  var formatted = {
    href: req.url,
    results: res.results,
    total: res.total,
    returned: res.returned
  };
  res.send(res.status || 200, formatted);
};