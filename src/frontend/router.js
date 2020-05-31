import React from 'react';
import {Switch, Route, Router, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import LandingPage from '@f/containers/LandingPage';
import ContributingPage from '@f/containers/ContributingPage';
import DocumentationPage from '@f/containers/DocumentationPage';

const router = () => {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path="/" render={() => <LandingPage/>}/>
        <Route path="/contributing" render={() => <ContributingPage/>}/>
        <Route path="/documentation" render={() => <DocumentationPage/>}/>
        <Route path="*" render={() => <Redirect to='/'/>}/>
      </Switch>
    </Router>
  );
};

export default router;
