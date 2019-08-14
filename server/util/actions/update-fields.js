'use strict'

const PregnancyCenterModel = require('../../pregnancy-centers/schema/mongoose-schema')
const PregnancyCenterHistoryModel = require('../../pregnancy-center-history/schema/mongoose-schema')
const FQHCModel = require('../../fqhcs/schema/mongoose-schema')
const FQHCHistoryModel = require('../../fqhc-history/schema/mongoose-schema')

const locationSchemaJoi = require('../../locations/schema/joi-schema')

const getFqhcObj = fqhcId => FQHCModel.findById(fqhcId)
const { getPregnancyCenterObj } = require('../pregnancy-center-helpers')

const R = require('ramda')

const updateFieldHelper = require('../update-field-helper')

const updatePregnancyCenterOutOfBusiness = R.partial(updateFieldHelper, [
	'outOfBusiness',
	locationSchemaJoi.outOfBusinessSchemaJoi,
	PregnancyCenterModel,
	PregnancyCenterHistoryModel,
	'pregnancyCenterId',
	getPregnancyCenterObj,
]) // leaves userId, id, outOfBusinessObj

const updateFqhcOutOfBusiness = R.partial(updateFieldHelper, [
	'outOfBusiness',
	locationSchemaJoi.outOfBusinessSchemaJoi,
	FQHCModel,
	FQHCHistoryModel,
	'fqhcId',
	getFqhcObj,
]) // leaves userId, id, outOfBusinessObj

const updatePregnancyCenterDoNotList = R.partial(updateFieldHelper, [
	'doNotList',
	locationSchemaJoi.doNotListSchemaJoi,
	PregnancyCenterModel,
	PregnancyCenterHistoryModel,
	'pregnancyCenterId',
	getPregnancyCenterObj,
]) // leaves userId, id, outOfBusinessObj

const updateFqhcDoNotList = R.partial(updateFieldHelper, [
	'doNotList',
	locationSchemaJoi.doNotListSchemaJoi,
	FQHCModel,
	FQHCHistoryModel,
	'fqhcId',
	getFqhcObj,
]) // leaves userId, id, outOfBusinessObj

module.exports = {
	updatePregnancyCenterOutOfBusiness,
	updateFqhcOutOfBusiness,
	updatePregnancyCenterDoNotList,
	updateFqhcDoNotList,
}
