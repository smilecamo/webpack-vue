<template>
  <div id='app'>
    <div id="cover"></div>
    <Header></Header>
    <p>{{couter}}</p>
    <p>{{fullName}}</p>
    <!-- 命名路由使用 -->
    <router-link to="/app/123">app</router-link>
    <router-link to="/login">login</router-link>
    <router-view />
    <Footer></Footer>
    <router-view name='a'></router-view>
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'
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
    console.log(this.$store)
    let i = 1
    // 第一种
    // setInterval(() => {
    //   this.$store.commit('updataCount', i++)
    // }, 1000)
    // 第二种通过...mapMutations
    setInterval(() => {
      this.updataCount(i++)
    }, 1000)
    // 异步通过actions
    // this.$store.dispatch('updateCountAsync', {
    //   num: 8,
    //   time: 1000
    // })
    // 第二种方式通过...mapActions
    // this.updateCountAsync({
    //   num: 8,
    //   time: 1000
    // })
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updataCount'])
  },
  computed: {
    // 第一种形式
    // ...mapState(['count']),
    // 第二种形式
    // ...mapState({
    //   couter: 'count'
    // }),
    // 第三种形式
    ...mapState({
      couter: (state) => state.count
    }),
    // 最后得形式
    // count () {
    //   // 获取store中得值
    //   return this.$store.state.count
    // },
    // 第一种getters
    ...mapGetters(['fullName'])
    // 第二种
    // getName () {
    //   return this.$store.getters.fullName
    // }
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

