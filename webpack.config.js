const path = require('path')
// const webpack = require('webpack')
const { rules, plugins } = require('webpack-atoms')

module.exports = (_, { mode }) => ({
	mode,
	entry: './client/index.js',
	devtool: mode === 'production' ? 'source-map' : 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, '/public'),
		publicPath: '/',
		filename: mode === 'production' ? '[name]--[chunkhash].js' : '[name].js',
	},
	devServer: {
		contentBase: './public',
		disableHostCheck: true,
		historyApiFallback: true,
		proxy: {
			'/api': 'http://localhost:4000',
		},
	},
	stats: 'minimal',
	module: {
		rules: [
			rules.js({
				include: path.resolve(__dirname, 'client/js'),
			}),
			rules.css(),
			rules.fonts(),
			rules.images(),
		],
	},
	plugins: [
		plugins.html({
			template: require.resolve('./client/assets/index.html'),
		}),
		plugins.extractCss(),
		plugins.copy({ patterns: ['client/assets/favicon.ico'] }),
		// plugins.favicons('./client/assets/favicon.ico'),
		plugins.define({
			// 'process.env.NODE_ENV': mode,
			'process.env.ENABLE_APP': JSON.stringify(
				process.env.NODE_ENV === 'dev' ||
					process.env.NODE_ENV === 'localhost' ||
					process.env.NODE_ENV === 'test',
			),
			VERIFICATION_PORTAL_FACEBOOK_APP_ID: JSON.stringify(
				process.env.VERIFICATION_PORTAL_FACEBOOK_APP_ID,
			),
		}),
	],
})
