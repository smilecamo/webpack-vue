<template>
  <section class="real-app">
    <input
    type="text"
    class="add-input"
    autofocus='autofocus'
    placeholder="接下来要去做什么"
    @keyup.enter='addTodo'
    >
    <item
    :todo='todo'
    v-for='todo of filteredTodos'
    :key='todo.id'
    @del='deleteTodo'
    />
    <tabs
    :filter="filter"
    :todos='todos'
    @toggle='toggleFilter'
    @clearAllCompleted= 'clearAllCompleted'
    ></Tabs>
    <router-view></router-view>
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  props: {
    id
  },
  mounted () {
    // console.log(this.id)
  },
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  methods: {
    addTodo (e) {
      // 第一项添加 unshift()
      this.todos.unshift(
        {
          id: id++,
          // trim() 取消空格
          content: e.target.value.trim(),
          completed: false
        }
      )
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  components: {
    Item,
    Tabs
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
  .add-input{
    position relative
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4em
    border 0
    outline none
    color inherit
    padding 6px
    border 1px solid #999
    box-shadow inset 0 -1px 5px 0 rgba(0,0,45,.5)
    box-sizing border-box
    }
  }
</style>

