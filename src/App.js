import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css'
import Navbar from './components/navbar.js'
import UserContainer from './container/user_container.js'



class App extends Component {
  render() {
    return (
      <div>
      <Navbar />
      <UserContainer />
      </div>
    );
  }
}

export default App;
