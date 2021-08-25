import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    xjfDetails: {},
    reslist: {},
    echartsWidth: true,
    hotlist2: [],
    clasname:""
  },
  mutations: {
    getxjfData(state, xjfData) {
      console.log(xjfData)
      state.xjfDetails = xjfData;
      console.log(state.xjfDetails)
    },
    getresList(state, list) {
      state.reslist = list
    },
    getEchartsWidth(state, width) {
      state.echartsWidth = !state.echartsWidth;
    },
    getHotinfo(state,list){
      state.hotlist2=list
    }, 
    getScrol(state,clasname){
      state.clasname=clasname
    }
  },
  actions: {
  },
  modules: {}
})