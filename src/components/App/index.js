import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthZeroService from '../../services/AuthZeroService';
import Auth from '../Auth';
import Login from '../Login';
import Callback from '../Callback';

class App extends Component {
  render() {
    const azs = new AuthZeroService();
    return (
      <Switch>
        <Route exact path="/" render={(props) => (
          <Auth {...props} isAuthenticated={azs.isAuthenticated}>
            <p>I am logged in</p>
            <button onClick={()=> azs.logout()}>Logout</button>
          </Auth>)}
        />
        <Route exact path="/login" render={(props) => (
          <Login {...props} login={azs.login}/>
        )}/>
        <Route exact path="/callback" render={(props) => {
          this.handleAuthentication(props);
          return <Callback {...props}/>
        }}/>
      </Switch>
    )
  }
  handleAuthentication = (nextState, replace) => {
    const azs = new AuthZeroService();
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      azs.handleAuthentication();
    }
  }
}

export default App;
