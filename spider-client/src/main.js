import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { Pagination, Select, Loading } from 'element-ui'
import routes from './routes'

Vue.use(VueRouter)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Loading)

const router = new VueRouter({
  routes
})

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
