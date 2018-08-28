import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'
export default [
  {
    path: '/',
    // 重定向
    redirect: '/login'
  },
  {
    // 路由命名
    name: 'app',
    // 路径 && 参数 && 通过$route获取值
    path: '/app/:id',
    // 这种可以直接通过props获取
    props: true,
    // 模块
    component: Todo,
    meta: {
      title: 'this is app'
    },
    // 子路由,需要配置router-view来显示
    children: [
      {
        path: 'test',
        component: Login
      }
    ]
  },
  {
    path: '/login',
    // 路由命名视图
    components: {
      default: Login,
      a: Todo
    }
  }
]
