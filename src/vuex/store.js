import Vue from 'vue'
import Vuex from 'vuex'
import utils from '@/utils'

import app from './modules/app';
import user from './modules/user'
import music from './modules/music'

import getters from './getters';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    
  },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    
  },
  modules: {
    app,
    user,
    music,
  },
  getters,
})

export default store