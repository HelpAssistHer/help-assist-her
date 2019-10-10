const { importTest } = require('./helpers')

describe('top', () => {
	importTest(
		'Pregnancy Center Tests',
		'./pregnancy-centers/pregnancy-center-tests.js',
	)
	importTest('FQHC Tests', './fqhcs/fqhc-tests.js')
	importTest('Unit Tests', './unit.js')
})
