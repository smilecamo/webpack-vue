<template>
  <div id='app'>
    <div id="cover"></div>
    <Header></Header>
    <!-- 命名路由使用 -->
    <router-link to="/app/123">app</router-link>
    <router-link to="/login">login</router-link>
    <router-view />
    <Footer></Footer>
    <router-view name='a'></router-view>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import ToDo from './views/todo/todo.vue'

export default{
  components: {
    Header,
    Footer,
    ToDo
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  top 0
  bottom 0
  right 0
}
  #cover{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #999
    opacity .8
    z-index -1
  }
</style>

