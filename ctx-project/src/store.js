import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:true,//登录状态  登录为True 非登录为false
    Username:"ctx",
    queryCommunityData:null//查询社区信息的数据

  },
  getters:{
    isLogin:state=>state.isLogin,
    Username:state=>state.Username,
    queryCommunityData:state=>state.queryCommunityData
  }
  ,
  mutations: {

  },
  actions: {

  }
})
