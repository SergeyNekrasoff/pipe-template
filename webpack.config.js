'use strict';
import { IS_PRODUCTION } from './config'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const PATHS = {
    app: __dirname + '/src/assets/js'
};

let plugins = [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    new webpack.ResolverPlugin(
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
    ),
    new CopyWebpackPlugin([
      { context: PATHS.app, from: 'separate', to: 'separate' }
    ])
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
                test: /\.jsx?$/,
                exclude: [
                    /node_modules/,
                    /bower_components/
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
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', 'bower_components']
    },
    plugins: plugins
};

export default config;
