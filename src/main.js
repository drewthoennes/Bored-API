import Vue from 'vue'
import App from './App'
import router from './router'

import vueResource from 'vue-resource'
import vueCookie from 'vue-cookie'

Vue.config.productionTip = false
Vue.use(vueResource)
Vue.use(vueCookie)

document.title = 'Bored API'

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
