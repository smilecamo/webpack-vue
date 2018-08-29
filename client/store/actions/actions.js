export default {
  updateCountAsync (store, data) {
    setInterval(() => {
      store.commit('updataCount', data.num)
    }, data.time)
  }
}
