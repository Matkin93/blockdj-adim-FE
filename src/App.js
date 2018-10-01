import React, { Component } from 'react';
import './App.css';
import Auth from './services/auth';

class App extends Component {
  render() {
    const auth = new Auth();
    return (
      <div className="App">
          {auth.login()}
      </div>
    );
  }
}

export default App;
