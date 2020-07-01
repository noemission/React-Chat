const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets',
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/fonts',
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            favicon: path.resolve(__dirname, 'assets', 'logo.png'),
        })
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    }
};