import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import RootView from './components/Root.vue'
import HomeView from './components/Home.vue'
import ItemView from './components/Item.vue'
// const HomeView = () => import('./components/Home.vue')
// const ItemView = () => import('./components/Item.vue')

export function createRouter() {
    return new Router({
        mode: 'history',
        fallback: false,
        scrollBehavior: () => ({ y: 0 }),
        routes: [
            { path: '/', component: RootView },
            { path: '/home', component: HomeView },
            { path: '/item/:id?', component: ItemView }
        ]
    })
}