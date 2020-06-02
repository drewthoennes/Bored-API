import React from 'react';
import {Switch, Route, Router, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import LandingPage from '@f/containers/LandingPage';
import ContributingPage from '@f/containers/ContributingPage';
import DocumentationPage from '@f/containers/DocumentationPage';

import Topbar from '@f/components/Topbar';
import Footer from '@f/components/Footer';

const defaultAPIVersion = '2';

const router = () => {
	return (
		<Router history={createBrowserHistory()}>
			<Topbar/>
			<Switch>
				<Route exact path="/" render={() => <LandingPage/>}/>
				<Route path="/contributing" render={() => <ContributingPage/>}/>
				<Route path="/docs/:version/:type?" render={() => <DocumentationPage/>}/>
				<Route path="/docs" render={() => <Redirect to={`/docs/v${defaultAPIVersion}`}/>}/>
				<Route path="*" render={() => <Redirect to='/'/>}/>
			</Switch>
			<Footer/>
		</Router>
	);
};

export default router;
