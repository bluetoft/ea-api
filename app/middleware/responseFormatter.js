'use strict';

module.exports = function(req, res, next) {
  var formatted = {
    href: req.url,
    results: res.results,
    total: res.total,
    returned: res.returned,
    session: req.session
  };
  res.send(res.status || 200, formatted);
};