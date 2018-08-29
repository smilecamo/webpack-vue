import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'
export default () => {
  return new Vuex.Store({
    // state: {
    //   count: 0
    // },
    // mutations: {
    //   updataCount (state, num) {
    //     state.count = num
    //   }
    // }
    state: defaultState,
    mutations,
    getters,
    actions
  })
}
