import Vue from 'vue';
import App from './App';
import router from './router';

import VueResource from 'vue-resource';
import VueNotification from 'vue-notification';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueNotification);

new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
});
