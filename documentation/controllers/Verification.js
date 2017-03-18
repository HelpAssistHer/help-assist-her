'use strict';

var url = require('url');

var Verification = require('./VerificationService');

module.exports.pregnancy_centersVerifyGET = function pregnancy_centersVerifyGET (req, res, next) {
  Verification.pregnancy_centersVerifyGET(req.swagger.params, res, next);
};

module.exports.updatePregnancyCenter = function updatePregnancyCenter (req, res, next) {
  Verification.updatePregnancyCenter(req.swagger.params, res, next);
};
