const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
	mode: 'production',
	output: {
		path: resolve('dist'),
		filename: 'js/[name].[chunkhash].js',
		chunkFilename: 'js/[id].[chunkhash].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve('static/index.html'),
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			}
		}),
		/* new BundleAnalyzerPlugin() */
	]
});
