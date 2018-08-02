import Vue from 'vue'
import App from './App'
import router from './router'

import vueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(vueResource);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
