import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthZeroService from '../../services/AuthZeroService';
import Auth from '../Auth';
import Callback from '../Callback';
import Unauthorised from '../Unauthorised';
import Areas from '../Areas';
import Layout from '../Layout';

class App extends Component {
  render() {
    const azs = new AuthZeroService();
    return (
      <Switch>
        <Route exact path="/" render={(props) => (
          <Auth {...props} login={azs.login} isAuthenticated={azs.isAuthenticated}>
            <Layout logout={azs.logout} title="Home" description="Something, Something, Dark Side">
              <div className="container">
                <p>I am logged in</p>
              </div>
            </Layout>
          </Auth>)}
        />
        <Route exact path="/callback" render={(props) => {
          return <Callback {...props} handleAuthentication={azs.handleAuthentication}/>
        }}/>
        <Route exact path="/unauthorised" render={(props) => {
          return <Unauthorised {...props} logout={azs.logout}/>
        }}/>
        <Route exact path="/areas" render={(props) => (
          <Layout logout={azs.logout} title="Areas" description="Cities and areas covered by this website">
          </Layout>
        )}
        />
      </Switch>
    )
  }
}

export default App;
