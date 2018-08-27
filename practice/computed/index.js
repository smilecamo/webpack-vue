import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    firstName: 'joky',
    lastName: 'lou',
    Number: 0
  },
  // template: '<div>{{firstName}}---{{lastName}}</div>',
  template: `
    <div>
    <p>{{name}}</p>
    <p>{{getName()}}</p>
    <p>Number:{{Number}}</p>
    <input type='text' v-model='Number'/>
    </div>
  `,
  computed: {
    // 计算属性 可以直接根据变量名直接调用 用于显示数据
    // 只会在自己的组件更新时调用
    name () {
      console.log('computed')
      return `${this.firstName} ${this.lastName}`
    }
  },
  watch: {

  },
  methods: {
    getName () {
      console.log('getName')
      return `${this.firstName} ${this.lastName}`
    }
  }
})
