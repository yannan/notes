import blogList from './page/blogList.vue'
const Foo = { template: '<div>foo {{ $route.params.id }}</div>' };
const Bar = { template: '<div>bar</div>' };

const routes = [
  { path: '', component: blogList },
  { path: '/foo/:id', component: Foo },
  { path: '/bar', component: Bar }
]

export default routes
