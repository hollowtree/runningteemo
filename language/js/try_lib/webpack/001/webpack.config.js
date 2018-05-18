const path = require('path')
// --- 清理文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin')
// --- 分离 css
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// --- 生成 Html
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ManifestPlugin = require('webpack-manifest-plugin')
const config = {
    mode: 'production',
    entry: {
        app: './src/app.js',
        home: './src/home.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './cdn'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['cdn']),
        new ManifestPlugin(),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            filename: 'app.html',
            title: 'page app',
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            filename: 'home.html',
            title: 'page home',
            chunks: ['home']
        }),
    ],
    output: {
        filename: '[name].[chunkhash].js',
        path: __dirname + '/cdn'
    }
}

module.exports = config;