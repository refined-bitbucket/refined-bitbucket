'use strict';
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './src/main',
        options: './src/options',
        background: './src/background'
    },
    plugins: [
        new webpack.DefinePlugin({
            process: {}
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CopyWebpackPlugin([
            {
                from: '*',
                context: 'src',
                ignore: '*.js'
            },
            {
                from: 'src/vendor/prism.js'
            }
        ])
    ],
    output: {
        path: path.join(__dirname, 'extension'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: 'babel-loader'
                    },
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader']
                    }
                ]
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
