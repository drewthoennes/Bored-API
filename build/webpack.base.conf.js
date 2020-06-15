const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

require('dotenv').config({path: path.resolve(__dirname, '../.env')});

function resolve(dir) {
  return path.join(__dirname, '../', dir);
}

module.exports = {
  entry: {
    app: './src/frontend/index.js'
  },
	output: {
    filename: '[name].bundle.[hash].js',
    chunkFilename: '[name].bundle.[hash].js',
    path: resolve('dist'),
    publicPath: '/'
	},
  devServer: {
    contentBase: resolve('dist'),
    compress: true
  },
  resolve: {
    extensions: ['.js', '.json', '.scss'],
    alias: {
        '@f': resolve('src/frontend'),
        '@theme': resolve('src/frontend/assets/scss/_theme.scss'),
        'jquery': 'jquery/dist/jquery.slim.js'
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ],
            cacheDirectory: true
          }
        }
      },
      {
        test:/\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './static/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery/dist/jquery.slim.js',
      jQuery: 'jquery/dist/jquery.slim.js',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel'
    })
  ]
};
