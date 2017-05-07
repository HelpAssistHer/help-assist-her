'use strict';

exports.rootGET = function(args, res, next) {
  /**
   * Home
   * Current returns 'Hello World' to test that the basic setup is working.  
   *
   * returns String
   **/
  var examples = {};
  examples['application/json'] = "aeiou";
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

