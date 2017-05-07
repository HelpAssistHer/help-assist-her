'use strict';

var url = require('url');

var PregnancyCenter = require('./PregnancyCenterService');

module.exports.pregnancy_centersGET = function pregnancy_centersGET (req, res, next) {
  PregnancyCenter.pregnancy_centersGET(req.swagger.params, res, next);
};

module.exports.pregnancy_centersNear_meGET = function pregnancy_centersNear_meGET (req, res, next) {
  PregnancyCenter.pregnancy_centersNear_meGET(req.swagger.params, res, next);
};

module.exports.pregnancy_centersVerifyGET = function pregnancy_centersVerifyGET (req, res, next) {
  PregnancyCenter.pregnancy_centersVerifyGET(req.swagger.params, res, next);
};

module.exports.updatePregnancyCenter = function updatePregnancyCenter (req, res, next) {
  PregnancyCenter.updatePregnancyCenter(req.swagger.params, res, next);
};
