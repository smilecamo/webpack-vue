import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import createState from './store/store'
import '../client/assets/styles/global.styl'
import createRouter from './config/router'

Vue.use(VueRouter)
Vue.use(Vuex)
// 创建vuex和router
const router = createRouter()
const store = createState()
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
  // console.log('beforeResolve')
  next()
})
router.afterEach((to, from) => {
  // console.log('after')
})
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
