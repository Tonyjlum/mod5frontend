import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css'
import NavigationBar from './components/navbar.js'
import UserContainer from './container/user_container.js'
import Homepage from './components/homepage.js'
import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom"


class App extends Component {

  renderHomepage = () => {
    return (
      <div>
        <Homepage />
      </div>
    )
  }
  renderStatic = () => {
    return (
      <div>
        <NavigationBar />
      </div>
    )
  }

  renderUserContainer = () => {
    return (
      <div>
        <UserContainer />
      </div>
    )
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={this.renderStatic}/>
          <Route exact path="/" component={this.renderHomepage}/>
          <Route exact path="/events" component={this.renderUserContainer}/>
        </div>
      </Router>
    )
  }
}

export default App;
