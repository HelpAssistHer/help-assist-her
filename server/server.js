'use strict'

const express = require('express')
const server = express()

const port = 4000

server.get('/', function (req, res) {
	res.send('Hello World!')
})

server.listen(port, function () {
	console.log(`Example app listening on port ${port}!`)
})
