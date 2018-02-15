'use strict'

const _ = require('lodash')
const config = require('config')
const fs = require('fs')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')
const stringify = require('csv-stringify')

const pregnancyCenterServices = require('../pregnancy-centers/pregnancy-center-services')
const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')

mongoose.Promise = require('bluebird')
const log = new Log('info')

// TODO: Error handling
const startDatabase = P.coroutine(function *startDatabase() {
	yield mongoose.connect(config.mongo.connectionString)

	log.info('Connected to database')
})

startDatabase()

const mapYesNo = (booleanValue) => {
	if (_.isUndefined(booleanValue)) return ''
	return booleanValue ? 'Yes' : 'No'
}

async function getOtherServicesPregnancyCenters() {

	let data = []

	const services = _.reduce(pregnancyCenterServices, function(obj,service) {
		obj[service.id] = service.name
		return obj
	}, {})

	const columns = _.merge({
		_id: '_id',
		prcName: 'Name',
		note: 'Notes',
		otherServices: 'Other Services',
	}, services)
	
	const servicesKeys = _.keys(services)

	const pregnancyCenters = await PregnancyCenterModel.find({otherServices:{$ne:null}})
	for (const pregnancyCenter of pregnancyCenters) {
		log.info(pregnancyCenter.prcName)
		const line = [pregnancyCenter._id, pregnancyCenter.prcName, pregnancyCenter.notes || '',
			pregnancyCenter.otherServices]
		const servicesValues = _.mapValues(pregnancyCenter.services, mapYesNo)
		for(const serviceKey of servicesKeys) {
			line.push(_.get(servicesValues, serviceKey, ''))
		}
		data.push(line)
	}
	
	stringify(data, { header: true, columns: columns }, (err, output) => {
		if (err) {
			log.error(err)
			throw err
		}
		fs.writeFile('otherservices.csv', output, (err) => {
			if (err) {
				log.error(err)
				throw err
			}
			log.info('otherservices.csv saved.')
			process.exit()
		})
	})
}

getOtherServicesPregnancyCenters()
