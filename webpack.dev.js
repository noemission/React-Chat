const webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path')
const internalIp = require('internal-ip');


module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.SERVER_URL': JSON.stringify(`http://${internalIp.v4.sync()}:3001`)
        })
    ],
    devServer: {
        historyApiFallback: true,
        port: 8001,
        open: true,
        host: '0.0.0.0',//your ip address

    },
    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [
                    'style-loader',
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
        ]
    }
})