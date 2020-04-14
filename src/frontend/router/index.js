import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
	return () => import(/* webpackChunkName: "view-[request]" */ `@/pages/${view}`);
}

const router = new Router({
	hashbang: false,
	history: true,
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: loadView('Home')
		},
		{
			path: '/about',
			name: 'About',
			component: loadView('About')
		},
		{
			path: '/documentation',
			name: 'Documentation',
			component: loadView('Documentation')
		},
		{
			path: '/contributing',
			name: 'Contributing',
			component: loadView('Contributing')
		},
		{
			path: '/*',
			name: 'Error',
			component: loadView('Error')
		}
	]
});

router.beforeEach((to, from, next) => {
	// Middleware
	next();
});

export default router
