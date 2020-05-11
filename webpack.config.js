'use strict'
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: './src/main',
        options: './src/options',
        background: './src/background',
        'background-for-requests': './src/background-for-requests',
    },
    plugins: [
        new webpack.DefinePlugin({
            process: {},
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new CopyWebpackPlugin([
            {
                from: '*',
                context: 'src/*',
                ignore: '*.js',
            },
            {
                from: 'src/vendor/prism.js',
            },
        ]),
    ],
    output: {
        path: path.join(__dirname, 'extension'),
        filename: '[name].js',
    },
    resolve: {
        alias: {
            typeahead: path.resolve(
                __dirname,
                'src/vendor/typeahead.jquery.js'
            ),
        },
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
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader'],
                    },
                ],
            },
        ],
    },
}
