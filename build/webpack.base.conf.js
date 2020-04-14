const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		app: './src/frontend/main.js'
	},
	output: {
		path: resolve('dist'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src/frontend'),
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						babelrc: false,
						presets: [
							'@babel/preset-env'
						],
						cacheDirectory: true
					}
				}
			},
			{
				test: /\.css$/,
				use: [
						'vue-style-loader',
						{
							loader: 'css-loader'
						}
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new CopyWebpackPlugin([
			{
				from: resolve('static'),
				to: resolve('dist'),
				ignore: ['.*']
			}
		])
	]
}
