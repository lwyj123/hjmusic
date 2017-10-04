import Vue from 'vue'
import App from './App'

// import store from './vuex/store'
// import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import 'common/style/index.scss'
fastclick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

new Vue({
  el: '#app',
  // router,
  // store,
  render: h => h(App)
})
