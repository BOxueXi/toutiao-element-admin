import {
  getUserData
} from '@/api/user'
export default {
  namespaced: true,
  state: {
    user: {}
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    getUser ({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        getUserData().then(res => {
          commit('setUser', res.data)
          resolve(res)
        })
      })
    }
  }
}
