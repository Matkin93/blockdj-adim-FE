import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthZeroService from '../../services/AuthZeroService';
import Auth from '../Auth';
import Callback from '../Callback';
import Unauthorised from '../Unauthorised';
import Areas from '../Areas';
import Layout from '../Layout';
// import MapPage from '../MapPage';
import Cities from '../Cities';
import Home from '../Home';

class App extends Component {
  render() {
    const azs = new AuthZeroService();
    return (
      <Switch>
        <Route exact path="/" render={(props) => (
          <Auth {...props} login={azs.login} isAuthenticated={azs.isAuthenticated}>
            <Layout logout={azs.logout} title="Home">
              <Home />
            </Layout>
          </Auth>)}
        />
        <Route exact path="/cities" render={(props) => (
          <Auth {...props} login={azs.login} isAuthenticated={azs.isAuthenticated}>
            <Layout logout={azs.logout} title="Cities" >
              <Cities {...props} />
            </Layout>
          </Auth>)}
        />
        <Route exact path="/areas/:id" render={(props) => (
          <Layout logout={azs.logout} title="Areas">
            <Areas {...props} />
          </Layout>
        )}
        />
        <Route exact path="/callback" render={(props) => {
          return <Callback {...props} handleAuthentication={azs.handleAuthentication} />
        }} />
        <Route exact path="/unauthorised" render={(props) => {
          return <Unauthorised {...props} logout={azs.logout} />
        }} />
        {/* <Route exact path="/map" component={MapPage} /> */}
      </Switch>
    )
  }
}

export default App;
