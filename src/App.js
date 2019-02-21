import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import Navbar from './components/navbar.js'
import Map from './components/map.js'
import EventContainer from './container/event_container.js'

class App extends Component {

  render() {
    return (
      <div className="App">
        "Testing"
        <Map />
        <EventContainer />
      </div>
    );
  }
}

export default App;
