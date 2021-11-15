import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 基础存放数据
  state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')):{
    isUserLogin: false,
    username: '',
  },
  // 存放vuex数据的方法
  mutations: {
    LoginIn(state , username){
      state.isUserLogin = true
      state.username = username
    },
    LoginOut(state){
      state.isUserLogin = false
      state.username = ''
    }
  },

  actions: {
  },
  modules: {
  }
})
