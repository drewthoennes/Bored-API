import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import HomePage from '@/pages/Home';
import AboutPage from '@/pages/About';
import DocumentationPage from '@/pages/Documentation';
import ContributingPage from '@/pages/Contributing';
import ErrorPage from '@/pages/Error';

const router = new Router({
	hashbang: false,
	history: true,
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: HomePage
		},
		{
			path: '/about',
			name: 'About',
			component: AboutPage
		},
		{
			path: '/documentation',
			name: 'Documentation',
			component: DocumentationPage
		},
		{
			path: '/contributing',
			name: 'Contributing',
			component: ContributingPage
		},
		{
			path: '/*',
			name: 'Error',
			component: ErrorPage
		}
	]
});

export default router;
