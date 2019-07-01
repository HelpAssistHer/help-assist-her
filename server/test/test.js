const importTest = (name, path) => {
	describe(name, () => {
		require(path)
	})
}

describe('top', () => {
	importTest('Pregnancy Center Tests', './pregnancy-center-tests.js')
	importTest('FQHC Tests', './fqhc-tests.js')
	importTest('Unit Tests', './unit.js')
})
