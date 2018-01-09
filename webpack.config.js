'use strict';
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './src/main',
        options: './src/options'
    },
    plugins: [
        new webpack.DefinePlugin({
            process: {}
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    output: {
        path: path.join(__dirname, 'extension'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new UglifyJSPlugin({
            sourceMap: false,
            uglifyOptions: {
                mangle: true,
                output: {
                    beautify: false
                }
            }
        })
    );
}
