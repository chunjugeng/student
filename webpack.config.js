const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ClearWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pkg = require('./package.json');
const argv = require('yargs').argv;
const isDev = argv.mode === 'development';
const isProd = !isDev;
const entryHtml = path.resolve(__dirname, './src/index.js');
const dist = path.resolve(__dirname, './dist');

const config = require('./routerConfig');
const srcRoot = fs.readdirSync(path.resolve('./src/modules'));
const htmlsPlugins = [];
const entry = Object.create(null);

function getPath(_path) {
	return path.resolve(__dirname, _path);
}

if (srcRoot.length) {
    srcRoot.forEach(srcModule=> {
        const moduleConfig = config[srcModule];
        if (moduleConfig) {
            const moduleEntry = getPath(`./src/modules/${srcModule}/${moduleConfig.entry}`);
            entry[srcModule] = [getPath('./polyfill'), moduleEntry];
            const outputDir = config[srcModule].outputDir || srcModule;
            htmlsPlugins.push(
                new HtmlWebpackPlugin({
                    inject: true,
                    hash: false,
                    filename: `${outputDir}/index.html`,
                    template: getPath(`./src/modules/${srcModule}/index.html`),
                    chunks: [srcModule]
                })
            );
        }
    });
}

let webpackConfig = {
    entry,
    output: {
        path: dist,
        publicPath: '/',
        chunkFilename: '[name].js',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '~': path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader'
                },
                include: path.join(__dirname, './src'),
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: ()=> [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer()
                            ]
                        }
                    },
                    {loader: 'sass-loader'}
                ]
            },
            {   
                test: /\.(css|scss|sass)$/,
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                            browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
                            flexbox: 'no-2009'
                        })
                    ]
                }
            },
            {
				test: /\.(png|jpg|gif|jpeg|svg)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit:  1,
						name: './images/[name].[ext]'
					}
				}
			}
        ]
    },
    plugins: [
        new ClearWebpackPlugin(dist),
        new webpack.DefinePlugin({
            __client__: true
        }),
        new ProvidePlugin({
            $: 'jquery',
            React: 'react',
            ReactDOM: 'react-dom'
        }),
        // new HtmlWebpackPlugin({
		// 	filename: `index.html`,
		// 	template: `./src/template.ejs`,
		// 	inject: true,
        // })
        ...htmlsPlugins
    ]
};
webpackConfig.devServer = {
    disableHostCheck: true,
	contentBase: dist,
	host: '0.0.0.0',
	port: pkg.dev.port,
	hot: false,
	inline: true,
    useLocalIp: true,
    proxy: pkg.proxy
};
module.exports = webpackConfig;
