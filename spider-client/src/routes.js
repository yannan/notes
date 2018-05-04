import blogList from './page/blogList.vue'
import poetryComponent from './page/poetry.vue'
import Code from './page/code.vue'

const routes = [
  { path: '', component: blogList },
  { path: '/code', component: Code },
  { path: '/poetry', component: poetryComponent }
]

export default routes
