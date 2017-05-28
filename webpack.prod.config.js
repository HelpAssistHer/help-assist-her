const path = require('path')
const webpack = require('webpack')

module.exports = {
	devtool: 'source-map',

	entry: ['babel-polyfill', './client/js/hah-app/index.js'],

	externals: {
		'clientConfig': JSON.stringify(process.env.ENV === 'production' ? {
			serverUrl: 'https://hah-dev.herokuapp.com'
		} : {
			serverUrl: 'http://localhost:4000'
		})
	},

	output: {
		path: path.join(__dirname, '/public'),
		filename: 'bundle.js',
		publicPath: '/public/'
	},

	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	],

	module: {
		loaders: [
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				include: path.resolve(__dirname, 'client/js'),
				exclude: /node_modules/
			},
			{
				test: /\.png$/,
				loader: 'file'
			},
		]
	}
}
