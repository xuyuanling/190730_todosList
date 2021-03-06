import Vue from 'vue'
import App from './App.vue'
import router from './router'

/* eslint-disable no-new */

Vue.prototype.$EventBus = new Vue()
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  router
})
