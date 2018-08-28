import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import '../client/assets/styles/global.styl'
import createRouter from './config/router'

Vue.use(VueRouter)
const router = createRouter()
// 导航全局守卫
// 跳转前验证
router.beforeEach((to, from, next) => {
  // 如果跳转到login时则跳转
  // if (to.fullPath === '/app') {
  //   next('/login')
  // }
  next()
})
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve')
  next()
})
router.afterEach((to, from) => {
  console.log('after')
})
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
