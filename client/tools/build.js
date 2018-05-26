const webpack = require('webpack')
const webpackConfig = require('../../webpack.prod.config')
const colors = require('colors')

process.env.NODE_ENV = 'dev'

console.log('Generating minified bundle for production via Webpack...'.blue)

webpack(webpackConfig).run((err, stats) => {
	if (err) {
		console.log(err.bold.red)
		return 1
	}

	const jsonStats = stats.toJson()

	if (jsonStats.hasErrors) {
		return jsonStats.errors.map(error => console.log(error.red))
	}

	if (jsonStats.hasWarnings) {
		console.log('Webpack generated the following warnings: '.bold.yellow)
		jsonStats.warnings.map(warning => console.log(warning.yellow))
	}

	console.log(`Webpack stats: ${stats}`)
	console.log(
		'Your app has been compiled in production mode and written to /public.'
			.green,
	)

	return 0
})

// Inspired by: http://www.thegreatcodeadventure.com/deploying-react-redux-to-heroku/
