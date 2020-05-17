'use strict'
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: './src/main',
        options: './src/_core/options/options',
        popup: './src/_core/popup/popup',
        background: './src/background',
        'background-for-requests': './src/background-for-requests',
    },
    plugins: [
        new webpack.DefinePlugin({
            process: {},
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CopyWebpackPlugin([
            {
                from: '*',
                context: 'src',
                ignore: '*.js',
            },
            {
                from: 'src/vendor/prism.js',
            },
            {
                context: 'src/_core/options',
                from: '*',
                ignore: '*.js',
            },
            {
                context: 'src/_core/popup',
                from: '*',
                ignore: '*.js',
            },
        ]),
    ],
    output: {
        path: path.join(__dirname, 'extension'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: 'babel-loader',
                    },
                    {
                        test: /\.css$/i,
                        use: [
                            {
                                loader: 'style-loader',
                            },
                            {
                                loader: 'css-loader',
                            },
                        ],
                    },
                ],
            },
        ],
    },
}
