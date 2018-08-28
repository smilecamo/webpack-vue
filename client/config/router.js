import Router from 'vue-router'
import routes from './routes'

export default () => {
  return new Router({
    routes,
    // 取消#
    mode: 'history',
    // 使用路径前缀 /base/login
    base: '/base/',
    // 跳转时加类
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    // 跳转滚动
    scrollBehavior (to, from, savedPosition) {
      // ...如果进入过页面就滚动到之前的页面
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    },
    // 如果不支持H5,就使用hash(#)
    fallback: true
  })
}
