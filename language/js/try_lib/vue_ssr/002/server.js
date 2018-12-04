const fs = require('fs')

const server = require('express')()

const createApp = require('./app')

const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./template/index.html', 'utf-8')
})

server.get('*', (req, res) => {
    const context = {
        url: req.url,
        title: `Hello World!`,
        meta: `
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    `
    }
    const app = createApp(context)

    renderer.renderToString(app, context)
        .then(html => {
            res.end(html)
        })
        .catch(err => {
            console.warn(err);
            res.status(500).end('Internal Server Error')
        })
}).listen(8080)