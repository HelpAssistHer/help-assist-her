'use strict'

const config = require('config')
const express = require('express')

const server = express()

// const port = config.server.port
const port = process.env.PORT

server.get('/', function (req, res) {
	res.send('Hello World!')
})

server.listen(port, function () {
	console.log(`Help Assist Her server listening on port ${port}`)
})
