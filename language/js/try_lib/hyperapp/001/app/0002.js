import { h, app } from './hyperapp'
const node = <div class="main">Hello World</div>

console.log(node)

app(null, null, node, document.querySelector('#app'))