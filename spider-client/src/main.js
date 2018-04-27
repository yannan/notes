import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { Pagination, Select } from 'element-ui'
import routes from './routes'

Vue.use(VueRouter)
Vue.use(Pagination)
Vue.use(Select)

const router = new VueRouter({
  routes
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
