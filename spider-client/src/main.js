import Vue from 'vue'
import App from './App.vue'
import { Pagination, Select } from 'element-ui'

Vue.use(Pagination)
Vue.use(Select)

new Vue({
  el: '#app',
  render: h => h(App)
})
