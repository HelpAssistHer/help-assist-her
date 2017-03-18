'use strict'

const config = require('config')
const cors = require('cors')
const express = require('express')
const Log = require('log')
const mongoose = require('mongoose')
const P = require('bluebird')

const server = express()
const port = config.server.port
const PregnancyCenterModel = require('../app/models/pregnancy-center');
const log = new Log('info')

mongoose.Promise = require('bluebird')
server.use(cors())

// TODO: Error handling
const startDatabase = P.coroutine(function *startDatabase() {
	const connectionString = `mongodb://${config.server.hostname}/${config.database.name}`

	yield mongoose.connect(connectionString)

    log.info('Connected to database')

})

startDatabase()

server.get('/', function(req, res) {
    res.send('Hello World!')
})

server.get('/api/pregnancy-centers', function(req, res) {

	PregnancyCenterModel.find({}, function (err, db_pcs) {
        if(err) {
        	log.error(err)
		}

		res.send(db_pcs);
    });
})

server.get('/api/pregnancy-centers/one', function(req, res) {

	PregnancyCenterModel.findOne({}, function (err, result) {
		if (err) {
			log.error(err)
		}

		res.send(result)
	})
})

server.listen(port, function() {
	log.info(`Help Assist Her server listening on port ${port}`)
})
