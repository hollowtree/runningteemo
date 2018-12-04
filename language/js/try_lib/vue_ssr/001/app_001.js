const Vue = require('Vue')

const app = new Vue({
    template: `<div>Hello World!</div>`
})

const renderer = require('vue-server-renderer').createRenderer()

renderer.renderToString(app)
    .then(html => console.log(html))
    .catch(err => console.error(err))