const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/index.tsx')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { 
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader" 
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { 
                enforce: "pre", 
                test: /\.js$/, 
                loader: "source-map-loader" 
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpq)$/,
                loader: 'url-loader? limit = 40000'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                    loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            camelCase: true,
                            minimize: true,
                            localIdentName: "[local]_[hash:base64:5]"
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.WatchIgnorePlugin([
            /css\.d\.ts$/
          ])
    ]
}