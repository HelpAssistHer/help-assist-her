'use strict';

var url = require('url');

var App = require('./AppService');

module.exports.pregnancy_centersGET = function pregnancy_centersGET (req, res, next) {
  App.pregnancy_centersGET(req.swagger.params, res, next);
};

module.exports.pregnancy_centersNear_meGET = function pregnancy_centersNear_meGET (req, res, next) {
  App.pregnancy_centersNear_meGET(req.swagger.params, res, next);
};
