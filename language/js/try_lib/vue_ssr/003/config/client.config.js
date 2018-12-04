const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./base.config')

const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const config = merge(base, {
    entry: {
        app: './src/entry-client.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new VueSSRClientPlugin()
    ]
})
module.exports = config
