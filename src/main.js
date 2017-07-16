// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import router from './router'

import 'normalize.css/normalize.css';// normalize.css 样式格式化
import 'assets/iconfont/iconfont'; // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki

import ElementUI from 'element-ui'
import IconSvg from 'components/Icon-svg';// svg 组件
import 'element-ui/lib/theme-default/index.css';

import socketio from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

export const SocketInstance = socketio('http://localhost:2333')

Vue.config.productionTip = false
Vue.component('icon-svg', IconSvg)

Vue.use(ElementUI)
Vue.use(VueSocketIO, SocketInstance)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
