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
        'background-for-webnavigation': './src/background-for-webnavigation',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
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
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader'],
                    },
                ],
            },
        ],
    },
}
