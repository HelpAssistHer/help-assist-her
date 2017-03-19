'use strict'

const path = require('path')

module.exports = {
	context: __dirname,
	entry: ['babel-polyfill', './client/js/HahApp.js'],
	devtool: 'eval',
	output: {
		path: path.join(__dirname, '/public'),
		filename: 'bundle.js'
	},
	devServer: {
		publicPath: '/public/',
		historyApiFallback: true
	},
	resolve: {
		extensions: ['.js', '.json']
	},
	stats: {
		colors: true,
		reasons: true,
		chunks: true
	},
	module: {
		rules: [{
		// 	enforce: 'pre',
		// 	test: /\.js$/,
		// 	loader: 'eslint-loader',
		// 	exclude: /node_modules/
		// }, {
			test: /\.json$/,
			loader: 'json-loader'
		},{
			include: path.resolve(__dirname, 'client/js'),
			test: /\.js$/,
			loader: 'babel-loader'
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						url: false
					}
				}
			]
		}]
	}
}
