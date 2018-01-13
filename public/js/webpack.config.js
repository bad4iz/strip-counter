const NODE_ENV = process.env.NODE_ENV || 'development';


var path = require('path');
var webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry:  ['babel-polyfill', './src/index.js'],
    output: {
        filename: './dist/bundle.js',
        library: 'myApp'
    },
    watch: NODE_ENV == 'development',

    // watcherOptions: {
    //     aggregateTimeout: 100
    // },

    // devtool: NODE_ENV == 'development' ? 'cheap-inline-module-map' : null,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify((NODE_ENV)),
            LANG:     JSON.stringify('ru')
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
};

if (NODE_ENV == 'production'){
    module.exports.plugins.push(
        new UglifyJsPlugin()
    )
};