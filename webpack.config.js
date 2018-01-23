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
                },
                compress: {
                    // https://github.com/refined-bitbucket/refined-bitbucket/issues/115
                    // https://github.com/refined-bitbucket/refined-bitbucket/pull/116
                    // The default value of this option was producing a bundle
                    // with broken code due to a constant variable reassignment
                    // that ended up causing a TypeError at runtime.
                    // See the issue and the pull request for more details.
                    // (default: true) -- Improve optimization on variables assigned with and used as constant values.
                    // eslint-disable-next-line camelcase
                    reduce_vars: false
                }
            }
        })
    );
}
