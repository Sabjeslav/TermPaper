import Vue from 'vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';

import App from './App.vue'
import ActiveTasks from './components/ActiveTasks.vue'
import About from './components/about.vue'
import Archive from './components/Archive.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

const routes = [
  {path: '/', name: 'ActiveTasks', component: ActiveTasks},
  {path: '/about', name: 'about', component: About},
  {path: '/archive', name: 'archive', component: Archive}
]

Vue.config.productionTip = false

const router = new VueRouter({
  routes
})

Vue.use(VueRouter)

new Vue({
  vuetify,
  render: h => h(App),
  router,
}).$mount('#app')
