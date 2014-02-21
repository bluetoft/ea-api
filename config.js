
var fs = require('fs');
var nconf = require('nconf');

// command line args are highest importance
nconf.argv();

// next use configuration files
// these are loaded in the following order
// note: higher order items take precedence 
// 1.) config/*.config.local.js
// 2.) config/*.config.js

var configDir = process.cwd() + '/config';
var files = fs.readdirSync(configDir);
var filter = function (pattern) {
    return files.filter(function (f) {
        return f.match(pattern);
    });
};

var configLocalJs = filter('.*\.config\.local\.js$');
var configJs = filter('.*\.config\.js$');

configLocalJs.forEach(function (f) {
    nconf.overrides(require(configDir + '/' + f));
});
configJs.forEach(function (f) {
    nconf.defaults(require(configDir + '/' + f));
});

// finally, use machine environment variables
nconf.env();

// export nconf as config
module.exports = nconf;