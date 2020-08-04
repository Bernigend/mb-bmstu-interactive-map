const path = require('path');

const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, options) => {
    console.log(`Webpack 'mode': ${options.mode}`);

    return {
        name: 'interactive-map',
        entry: {
            main: './src/app.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[chunkhash].js'
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                sourceMap: true,
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                            }
                        }
                    ],
                },
                {
                    test: /\.(svg|png|jpg|gif|ico|cur)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                        name: '[name].[contenthash].[ext]'
                    }
                },
                {
                    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts',
                        name: '[name].[contenthash].[ext]'
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: 'style.[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                inject: true,
                hash: true,
                minify: options.mode === 'production',
                template: './src/html/index.html',
                filename: 'index.html'
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: './src/map', to: './map' },
                    { from: './src/images/icons.svg', to: './mapplic/images/icons.svg' }
                ]
            })
        ],
    }
};