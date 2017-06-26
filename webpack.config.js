'use strict'

const path = require('path')
const webpack = require('webpack')

const rootPath = path.join(__dirname, './client/js/hah-app/index.js')
const buildPath = path.join(__dirname, './build')
const imgPath = path.join(__dirname, './client/assets/img')
const iconPath = path.join(__dirname, './client/assets/icons')
const clientPath = path.join(__dirname, './client')
const isProduction = false
//
// module.exports = {
// 	context: jsClientPath,
// 	entry: {
// 		js: './hah-app/index.js',
// 	},
// 	devtool: 'eval',
// 	output: {
// 		path: buildPath,
// 		publicPath: '/',
// 		filename: 'app-[hash].js',
// 	},
// 	devServer: {
// 		contentBase: buildPath,
// 		historyApiFallback: true,
// 		port: 3000,
// 		compress: isProduction,
// 		inline: !isProduction,
// 		hot: !isProduction,
// 		host: '0.0.0.0',
// 		disableHostCheck: true,
// 		stats: {
// 			assets: true,
// 			children: false,
// 			chunks: false,
// 			hash: false,
// 			modules: false,
// 			publicPath: false,
// 			timings: true,
// 			version: false,
// 			warnings: true,
// 			colors: {
// 				green: '\u001b[32m',
// 			},
// 		},
// 	},
// 	plugins: [
// 		new webpack.DefinePlugin({
// 			'VERIFICATION_PORTAL_FACEBOOK_APP_ID': JSON.stringify(
// 				process.env.VERIFICATION_PORTAL_FACEBOOK_APP_ID
// 			)
// 		})
// 	],
// 	resolve: {
// 		extensions: ['.js', '.json']
// 	},
// 	stats: {
// 		colors: true,
// 		reasons: true,
// 		chunks: true
// 	},
// 	module: {
// 		rules: [{
// 		// 	enforce: 'pre',
// 		// 	test: /\.js$/,
// 		// 	loader: 'eslint-loader',
// 		// 	exclude: /node_modules/
// 		// }, {
// 			test: /\.json$/,
// 			loader: 'json-loader'
// 		},{
// 			include: path.resolve(__dirname, 'client/js'),
// 			test: /\.js$/,
// 			loader: 'babel-loader'
// 		}, {
// 			test: /\.css$/,
// 			use: [
// 				'style-loader',
// 				{
// 					loader: 'css-loader',
// 					options: {
// 						url: false
// 					}
// 				}
// 			]
// 		}]
// 	},
// 	watch: true
// }


module.exports = {
	entry: ['babel-polyfill', rootPath],
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},
	devServer: {
		publicPath: '/',
		contentBase: './public',
		proxy: {
			'/api': {
				target: 'http://localhost:4000/',
				secure: false
			}
		}
	},
	module: {
		rules: [{
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