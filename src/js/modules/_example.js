// Require other modules whose functions you need or directly from node_modules
// var someModule = require('./_some-module'),


// Require from node_modules directly via the package name
// var $ = require('jQuery');
//$('.some-element').addClass('foo');


// This is a private function, prefixed with an underscore.
// This shouldn't be exported, only used within this module by other functions.
function _consoleLogger(val) {
  console.log(val);
}


function greeting() {
  console.log('This appears to be working...');
  _consoleLogger('...and so does this.');
}


// Export the functions you want to make avaiable to any JS file that requires this one.
module.exports = {
  greeting: greeting
}
