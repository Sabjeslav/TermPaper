import Vue from 'vue'
import router from './routes/router'
import vuetify from './plugins/vuetify';


import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  router,
}).$mount('#app')
