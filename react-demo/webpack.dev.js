const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: __dirname + '/dist',
        historyApiFallback: true,
        inline: true,
        hot: true
    }
})