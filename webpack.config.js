'use strict';
import { IS_PRODUCTION } from './config'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const PATHS = {
    app: __dirname + '/src/assets/js'
};

let plugins = [
    new CopyWebpackPlugin([
      { context: PATHS.app, from: 'separate', to: 'separate', from: 'vendor', to: 'vendor' }
    ]),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
    })
];

if (IS_PRODUCTION) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        beautify: false,
        compress: true,
        comments: false
    }));
}

const config = {
  module: {
      loaders: [
          {
              test: /\.js$/,
              exclude: [
                  /node_modules/
              ],
              include: PATHS.app,
              loader: 'babel-loader',
              query: {
                  presets: [
                  	'es2015'
                  ]
              }
          },
          {
              test: /\.json?$/,
              loader: 'json-loader',
          }
      ],
  },
  watch: !IS_PRODUCTION,
	watchOptions: {
		aggregateTimeout: 700
	},
  resolve:  {
      extensions: ['', '.js'],
      modulesDirectories: ['node_modules']
  },
  plugins: plugins,
  externals: {
    jQuery: 'jQuery'
  }
};

export default config;
