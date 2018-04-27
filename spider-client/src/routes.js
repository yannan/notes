import blogList from './page/blogList.vue'
const Foo = { template: '<div>foo {{ $route.params.id }}</div>' };
import poetryComponent from './page/poetry.vue'

const routes = [
  { path: '', component: blogList },
  { path: '/foo/:id', component: Foo },
  { path: '/poetry', component: poetryComponent }
]

export default routes
