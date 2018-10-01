import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthZeroService from '../../services/AuthZeroService';
import Auth from '../Auth';
import Callback from '../Callback';

class App extends Component {
  render() {
    const azs = new AuthZeroService();
    return (
      <Switch>
        <Route exact path="/" render={(props) => (
          <Auth {...props} login={azs.login} isAuthenticated={azs.isAuthenticated}>
            <p>I am logged in</p>
            <button onClick={()=> azs.logout(props)}>Logout</button>
          </Auth>)}
        />
        <Route exact path="/callback" render={(props) => {
          this.handleAuthentication(props);
          return <Callback {...props}/>
        }}/>
      </Switch>
    )
  }
  handleAuthentication = (props) => {
    const azs = new AuthZeroService();
    if (/access_token|id_token|error/.test(props.location.hash)) {
      azs.handleAuthentication(props);
    }
  }
}

export default App;
