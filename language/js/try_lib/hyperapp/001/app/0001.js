// import { h, app } from "hyperapp"
import { h, app } from "./yui"

const state = {
    count: 0
  }
  
  const actions = {
    down: () => state => ({ count: state.count - 1 }),
    up: () => state => ({ count: state.count + 1 })
  }
  
  const view = (state, actions) => (
    <main>
      <h1>{state.count}</h1>
      <button onclick={actions.down}>-</button>
      <button onclick={actions.up}>+</button>
    </main>
  )
  
  window.main = app(state, actions, view, document.querySelector('#app'))