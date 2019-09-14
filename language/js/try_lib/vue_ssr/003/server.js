
const fs = require('fs')
const path = require('path')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')


const resolve = file => path.resolve(__dirname, file)

const app = express()

function createRenderer(bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
        basedir: resolve('./dist')
    }))
}


const isProd = process.env.NODE_ENV === 'production'

let renderer
let readyPromise
const templatePath = resolve('./src/template/index.html')

readyPromise = require('./config/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
        renderer = createRenderer(bundle, options)
    }
)

const port = process.env.PORT || 8080


function render(req, res) {
    res.setHeader("Content-Type", "text/html")

    const context = {
        url: req.url,
        title: `Hello World!`,
        meta: `
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    `
    }
    console.log(1234)
    renderer.renderToString(context)
        .then(html => {
            res.end(html)
        })
        .catch(err => {
            console.warn(err);
            if (err.code === 404) {
                res.status(404).end('404 | Page not found')
            } else {
                res.status(500).end('500 | Internal Server Error')
            }
        })
}

app.get('*', (req, res) => {
    readyPromise.then(() => render(req, res))
}).listen(port, () => {
    console.log(`server started at localhost:${port}`)
})