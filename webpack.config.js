'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
	mode: 'development',
	context: __dirname,
	entry: ['@babel/polyfill', './client/js/hah-app/index.js'],
	devtool: 'inline-source-map',
	target: 'web',
	output: {
		path: path.join(__dirname, '/public'),
		filename: 'bundle.js',
	},
	devServer: {
		publicPath: '/public/',
		historyApiFallback: true,
	},
	plugins: [
		new webpack.DefinePlugin({
			VERIFICATION_PORTAL_FACEBOOK_APP_ID: JSON.stringify(
				process.env.VERIFICATION_PORTAL_FACEBOOK_APP_ID,
			),
		}),
	],
	resolve: {
		extensions: ['.js', '.json'],
	},
	stats: {
		assets: false,
		builtAt: true,
		cached: true,
		chunks: false,
		colors: true,
		errors: true,
		errorDetails: true,
		hash: true,
		performance: true,
		reasons: false,
		warnings: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
				include: path.resolve(__dirname, 'client/js'),
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
				],
			},
		],
	},
}
