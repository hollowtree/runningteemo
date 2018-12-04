const Vue = require('Vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
    const app = new Vue({
        data() {
            return {
                url: req.url
            }
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    })

    renderer.renderToString(app)
        .then(html => {
            res.end(`
            <!DOCTYPE html>
            <html lang="en">
              <head><title>Hello</title></head>
              <body>${html}</body>
            </html>
            `)
        })
        .catch(err => {
            res.status(500).end('Internal Server Error')
        })
}).listen(8080)