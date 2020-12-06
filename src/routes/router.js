import Vue from 'vue'
import Router from 'vue-router'

import ActiveTasks from '../components/ActiveTasks.vue'
import About from '../components/about.vue'
import Archive from '../components/Archive.vue'
import EditTask from '../components/ModalWindow.vue'

const routes = [
    {path: '/tasks', name: 'ActiveTasks', component: ActiveTasks},
    {path: '/about', name: 'about', component: About},
    {path: '/archive', name: 'archive', component: Archive},
    {path: '/tasks/:id', name: 'EditTask', component: EditTask},
    {path: '*', redirect: '/tasks'}
]

Vue.use(Router)


export default new Router({
    mode: 'history',
    routes
  })
  