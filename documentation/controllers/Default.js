'use strict';

var url = require('url');

var Default = require('./DefaultService');

module.exports.rootGET = function rootGET (req, res, next) {
  Default.rootGET(req.swagger.params, res, next);
};
