import Vue from 'vue'
import App from './App'
import router from './router'

import vueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(vueResource);

document.title = 'Bored API'

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
