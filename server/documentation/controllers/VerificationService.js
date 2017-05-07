'use strict';

exports.pregnancy_centersVerifyGET = function(args, res, next) {
  /**
   * Verify Pregnancy Center
   * The Verify Pregnancy Center endpoint returns a single pregnancy center that needs verification (aka has not had its address verified.)
   *
   * returns PregnancyCenter
   **/
  var examples = {};
  examples['application/json'] = "";
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updatePregnancyCenter = function(args, res, next) {
  /**
   * Update Pregnancy Center
   * The Update Pregnancy Center endpoint allows the end user to update and verify information about a pregnancy center.
   *
   * id String The ID for the pregnancy center to be updated
   * pregnancyCenterUpdate PregnancyCenterUpdate The Pregnancy Center Json to Update
   * returns PregnancyCenter
   **/
  var examples = {};
  examples['application/json'] = "";
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

