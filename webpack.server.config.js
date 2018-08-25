
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ClearWebpackPlugin = require('clean-webpack-plugin');

const distServer = path.resolve('dist-server');
module.exports = {
    entry: {
        prerender: path.resolve(__dirname, './prerender')
    },
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.join(__dirname, 'dist-server'),
        filename: '[name].js'
    },
    resolve: {
        extensions:['.js', '.jsx'],
        alias: {
            '~': path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    env: {
                        development: {
                            plugins: [
                                [
                                    'babel-plugin-transform-require-ignore',
                                    {
                                        extensions: ['.scss', '.css', '.sass']
                                    }
                                ]
                            ]
                        }
                    }
                }
            },
            {
				test: /\.(png|jpg|gif|jpeg|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: './images/[name].[ext]'
					}
				}
            },
            {
                test: /\.svg/, 
                use: {
                    loader: 'svg-url-loader',
                    options: {
						name: './images/[name].[ext]'
					}
                }
            }
        ]
    },
    plugins: [
        new ClearWebpackPlugin('dist-server'),
        new webpack.DefinePlugin({
            __GIOID__: 11212112,
            __client__: false
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            React: 'react',
            ReactDOM: 'react-dom'
        })
    ]
};
