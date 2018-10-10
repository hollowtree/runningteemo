// import { h, app } from "hyperapp"
import { h, app } from "./hyperapp"

const state = {
    count: 0
}

const actions = {
    up: () => state => ({ count: state.count + 1 })
}

const view = (state, actions) => (
    <button onclick={actions.up}>{state.count}</button>
)

window.main = app(state, actions, view, document.querySelector('#app'))