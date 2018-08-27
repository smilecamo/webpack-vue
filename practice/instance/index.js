import Vue from 'vue'

const app = new Vue({
  data: {
    text: 0,
    obj: {}
  },
  template: '<div>{{text}}{{obj.a}}</div>'
})

// 挂载到
app.$mount('#root')

// app.text 设置
// setInterval(() => {
//   app.text += 1
// }, 1000)

// 实例
console.log(app.$data)
console.log(app.$props)
console.log(app.$el)
console.log(app.$options)
let i = 0
setInterval(() => {
  i++
  // 更新渲染
  // app.obj.a = i
  // app.$forceUpdate()
  app.$set(app.obj, 'a', i)
}, 1000)
