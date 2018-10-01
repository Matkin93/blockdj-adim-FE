import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthZeroService from '../../services/AuthZeroService';
import Auth from '../Auth';
import Login from '../Login';

class App extends Component {
  render() {
    const azs = new AuthZeroService();
    return (
      <Switch>
        <Route exact path="/" render={(props) => (
          <Auth {...props} isAuthenticated={azs.isAuthenticated}>
            <p>I am logged in</p>
          </Auth>)}
        />
        <Route exact path="/login" render={(props) => (
          <Login {...props} login={azs.login}/>
        )}/>
      </Switch>
    )
  }
}

export default App;
