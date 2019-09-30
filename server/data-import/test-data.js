'use strict'

const config = require('config')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')

const PregnancyCenterModel = require('../pregnancy-centers/schema/mongoose-schema')
const pregnancyCenterSchemaJoi = require('../pregnancy-centers/schema/joi-schema')

const UserModel = require('../users/schema/mongoose-schema')
const PersonModel = require('../persons/schema/mongoose-schema')
const PregnancyCenterHistoryModel = require('../pregnancy-center-history/schema/mongoose-schema')

mongoose.Promise = require('bluebird')
const log = new Log('info')

// TODO: Error handling
const startDatabase = P.coroutine(function* startDatabase() {
	yield mongoose.connect(config.mongo.connectionString)

	log.info('Connected to database')
})

startDatabase()

async function reimport() {
	await PregnancyCenterModel.collection.drop()
	await UserModel.collection.drop()
	await PregnancyCenterHistoryModel.collection.drop()
	await PersonModel.collection.drop()

	const user = await UserModel.create({
		providerId: '10155647416405110',
		updatedAt: '2017-08-26 14:14:03.553',
		provider: 'facebook',
		displayName: 'Kate Sills',
		__v: 0,
		createdAt: '2017-08-26 14:14:03.553',
	})

	const primaryContactPerson = await PersonModel.create({
		createdAt: '2017-03-03T00:00:00',
		email: 'katelynsills@gmail.com',
		firstName: 'Kate',
		lastName: 'Sills',
		phone: '+19167163024',
		updatedAt: '2017-03-03T00:00:00',
	})
	const primaryContactPersonObj = primaryContactPerson.toObject()
	primaryContactPersonObj._id = primaryContactPersonObj._id.toString()

	const pregnancyCenter = {
		address: {
			line1: '518 Clinton Ave.',
			line2: 'Line 2 test',
			city: 'Albany',
			state: 'NY',
			zip: '12206',
		},
		createdAt: '2017-03-03T00:00:00',
		email: 'info@alphacare.org',
		hours: {
			'0': {
				open: 800,
				close: 1700,
				closedAllDay: false,
			},
			'1': {
				open: 800,
				close: 1700,
				closedAllDay: false,
			},
			'2': {
				open: 800,
				close: 1700,
				closedAllDay: false,
			},
			'3': {
				open: 800,
				close: 1700,
				closedAllDay: false,
			},
			'4': {
				open: 800,
				close: 1700,
				closedAllDay: false,
			},
			'5': {
				open: 800,
				close: 1700,
				closedAllDay: false,
			},
			'6': {
				closedAllDay: true,
			},
		},
		prcName: 'Alpha Pregnancy Care Center',
		notes:
			'They have ongoing CBE classes.\nPlease change website to ORG.\nSocial worker and peer counseling.',
		phone: '+15184622188',
		primaryContactPerson: primaryContactPersonObj,
		services: {
			medicalQualityPregnancyTest: true,
			ultrasound: true,
			materialAssistance: true,
			postAbortionCounseling: true,
			parentingClasses: true,
			stdTesting: true,
			licensedProfessionalCounseling: true,
			other: true,
		},
		verifiedData: {
			address: {
				date: '2017-03-03T00:00:00',
				verified: true,
				userId: user._id.toString(),
			},
			email: {
				date: '2017-03-03T00:00:00',
				verified: true,
				userId: user._id.toString(),
			},
			hours: {
				date: '2017-03-03T00:00:00',
				verified: true,
				userId: user._id.toString(),
			},
			prcName: {
				date: '2017-03-03T00:00:00',
				verified: true,
				userId: user._id.toString(),
			},
			phone: {
				date: '2017-03-03T00:00:00',
				verified: true,
				userId: user._id.toString(),
			},
			primaryContactPerson: {
				date: '2017-03-03T00:00:00',
				verified: true,
				userId: user._id.toString(),
			},
			services: {
				date: '2017-03-03T00:00:00',
				verified: true,
				userId: user._id.toString(),
			},
			website: {
				date: '2017-03-03T00:00:00',
				verified: true,
				userId: user._id.toString(),
			},
		},
		updated: {
			address: {
				date: '2017-03-03T00:00:00',
				userId: user._id.toString(),
			},
			email: {
				date: '2017-03-03T00:00:00',
				userId: user._id.toString(),
			},
			hours: {
				date: '2017-03-03T00:00:00',
				userId: user._id.toString(),
			},
			prcName: {
				date: '2017-03-03T00:00:00',
				userId: user._id.toString(),
			},
			phone: {
				date: '2017-03-03T00:00:00',
				userId: user._id.toString(),
			},
			primaryContactPerson: {
				date: '2017-03-03T00:00:00',
				userId: user._id.toString(),
			},
			services: {
				date: '2017-03-03T00:00:00',
				userId: user._id.toString(),
			},
			website: {
				date: '2017-03-03T00:00:00',
				userId: user._id.toString(),
			},
		},
		updatedAt: '2017-03-03T00:00:00',
		website: 'http://www.alphacare.com',
	}

	const validationObj = await pregnancyCenterSchemaJoi.validate(
		pregnancyCenter,
		{
			abortEarly: false,
		},
	)
	if (validationObj.error) {
		log.error(validationObj.error)
	} else {
		const validatedPregnancyCenter = validationObj.value
		const newPregnancyCenter = await PregnancyCenterModel.create(
			validatedPregnancyCenter,
		)
		log.info(newPregnancyCenter._id)
	}

	process.exit()
}

reimport()
