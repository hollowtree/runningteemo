const fs = require('fs')

const Vue = require('Vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./template/index_004.html', 'utf-8')
})

server.get('*', (req, res) => {
    const app = new Vue({
        data() {
            return {
                url: req.url
            }
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    })

    const context = {
        title: 'hello',
        meta: `
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    `
    }

    renderer.renderToString(app, context)
        .then(html => {
            res.end(html)
        })
        .catch(err => {
            res.status(500).end('Internal Server Error')
        })
}).listen(8080)