const webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path')
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [new TerserJSPlugin({
            terserOptions: {
                compress : {
                    drop_console: true
                }
            }
        }), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.DefinePlugin({
            // 'process.env.SERVER_URL': JSON.stringify("")
        })
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1
                        }
                    },
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(__dirname, 'src', 'styles', 'mixins.scss'),
                        }
                    }
                ],
            },
        ],
    },
})