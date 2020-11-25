import Vue from 'vue'
import Router from 'vue-router'
// import routes from '@/routes'

// import App from '../components/App.vue'
import ActiveTasks from '../components/ActiveTasks.vue'
import About from '../components/about.vue'
import Archive from '../components/Archive.vue'

const routes = [
    {path: '/', name: 'ActiveTasks', component: ActiveTasks},
    {path: '/about', name: 'about', component: About},
    {path: '/archive', name: 'archive', component: Archive}
]

Vue.use(Router)


export default new Router({
    mode: 'history',
    routes
  })
  