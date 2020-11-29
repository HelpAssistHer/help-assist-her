'use strict'

const _ = require('lodash')

const { pregnancyCenterServices } = require('../pregnancy-center-services')

/*
	Create the Joi and Mongoose schemas based off of the pregnancy-center-services
	array so that services only need to be updated in one place.
*/
exports.getPregnancyCenterServicesSchema = (dataType) => {
	const services = _.mapKeys(pregnancyCenterServices, (service) => service.id)
	return _.mapValues(services, () => dataType)
}
