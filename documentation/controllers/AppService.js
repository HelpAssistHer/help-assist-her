'use strict';

exports.pregnancy_centersGET = function(args, res, next) {
  /**
   * All Pregnancy Centers
   * The all Pregnancy Centers endpoint returns an array of all pregnancy centers  currently stored in the database.  
   *
   * limit BigDecimal Limit the number of pregnancy centers returned. Default is 50
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ "" ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.pregnancy_centersNear_meGET = function(args, res, next) {
  /**
   * Near Me
   * The Near Me endpoint is currently hardcoded for testing purposes. It returns an array of pregnancy centers within a 5 mile radius, ordered by distance from the center.
   *
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ "" ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

