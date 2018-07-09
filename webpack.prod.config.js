const path = require('path')
const webpack = require('webpack')

module.exports = {
	context: __dirname,

	devtool: 'source-map',

	entry: ['babel-polyfill', './client/js/hah-app/index.js'],

	output: {
		path: path.join(__dirname, '/public'),
		filename: 'bundle.js',
		publicPath: '/public/',
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false,
			},
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('dev'),
			},
		}),
	],

	resolve: {
		extensions: ['.js', '.json'],
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, 'client/js'),
				exclude: /node_modules/,
			},
			{
				test: /\.png$/,
				loader: 'file',
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
		],
	},
}
