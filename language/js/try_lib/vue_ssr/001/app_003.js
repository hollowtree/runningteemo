// 全等于 app_002.js
const fs = require('fs')

const Vue = require('Vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
    template: fs.readFileSync('./template/index_003.html', 'utf-8')
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

    renderer.renderToString(app)
        .then(html => {
            res.end(html)
        })
        .catch(err => {
            res.status(500).end('Internal Server Error')
        })
}).listen(8080)