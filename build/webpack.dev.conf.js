const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
	mode: 'development',
	output: {
		path: resolve('dist'),
		filename: 'js/[name].[chunkhash].js',
		chunkFilename: 'js/[id].[chunkhash].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve('static/index.html'),
			inject: true
		}),
	]
});
