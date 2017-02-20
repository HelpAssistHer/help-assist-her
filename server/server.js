'use strict'

const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const P = require('bluebird')
const bodyParser = require('body-parser');

const server = express()
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());
const port = config.server.port
const PregnancyCenterModel = require('../app/models/pregnancy-center');


mongoose.Promise = require('bluebird')

// TODO: Error handling
const startDatabase = P.coroutine(function *startDatabase() {
	const connectionString = `mongodb://${config.server.hostname}/${config.database.name}`

	yield mongoose.connect(connectionString)

    console.log("connecting to database")

})

startDatabase()


server.get('/', function(req, res) {
    res.send('Hello World!')
})

server.get('/api/pregnancy-centers', function(req, res) {

	PregnancyCenterModel.find({}, function (err, db_pcs) {
        if(err) {
        	console.log(err)
		}

		res.send(db_pcs)
    });
})


server.get('/api/pregnancy-centers/verify', function(req, res) {
	PregnancyCenterModel.findOne({ verifiedById: null}, function (err, pc) {
        if (err) console.log(err);
        res.send(pc)
	})
})

server.put('/api/pregnancy-centers/:pregnancyCenterId', function(req, res) {
    PregnancyCenterModel.update({_id: req.params['pregnancyCenterId']}, req.body, function (err, pc) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(pc)
        }
    })
})

server.listen(port, function() {
	console.log(`Help Assist Her server listening on port ${port}`)
})
