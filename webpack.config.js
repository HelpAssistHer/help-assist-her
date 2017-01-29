'use strict'

const path = require('path')

module.exports = {
	context: __dirname,
	entry: './client/js/HahApp.js',
	devtool: 'eval',
	output: {
		path: path.join(__dirname, '/public'),
		filename: 'bundle.js'
	},
	devServer: {
		publicPath: '/public/'
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
			enforce: 'pre',
			test: /\.js$/,
			loader: 'eslint-loader',
			exclude: /node_modules/
		}, {
			include: path.resolve(__dirname, 'js'),
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
