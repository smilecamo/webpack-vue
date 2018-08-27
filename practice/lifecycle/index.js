import Vue from 'vue'

// 生命周期
new Vue({
  el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 'aaa'
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  }
})
