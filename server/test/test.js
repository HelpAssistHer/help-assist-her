const mongoose = require('mongoose')

const { server } = require('../server')
const { importTest } = require('./helpers')

describe('top', () => {
	importTest(
		'Pregnancy Center Tests',
		'./pregnancy-centers/pregnancy-center-tests.js',
	)
	importTest('FQHC Tests', './fqhcs/fqhc-tests.js')
	importTest('Unit Tests', './unit.js')

	after(() => {
		mongoose.disconnect()
		server.close()
	})
})
