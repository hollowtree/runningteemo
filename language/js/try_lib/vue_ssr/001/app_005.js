const Vue = require('Vue')

const app = new Vue({
    template: `<div><button @click="count--">-</button>{{count}}<button @click="count++">+</button></div>`,
    data(){
        return {
            count: 10
        }
    }
})

const renderer = require('vue-server-renderer').createRenderer()

renderer.renderToString(app)
    .then(html => console.log(html))
    .catch(err => console.error(err))