const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new UglifyjsWebpackPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
})