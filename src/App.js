import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css'
import NavigationBar from './components/navbar.js'
import UserContainer from './container/user_container.js'
import Homepage from './components/homepage.js'
import NewUserContainer from './container/newusercontainer.js'
import LoginForm from './components/loginform.js'
import MyEventContainer from './container/myeventcontainer.js'

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

  renderNewMemeber = () => {
    return (
      <NewUserContainer />
    )
  }

  renderLoginForm = () =>{
    return <LoginForm />
  }

  renderMyEventContainer = () => {
    return <MyEventContainer />
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={this.renderStatic}/>
          <Route exact path="/" component={this.renderHomepage}/>
          <Route exact path="/events" component={this.renderUserContainer}/>
          <Route exact path="/newmember" component={this.renderNewMemeber}/>
          <Route exact path ="/login" component={this.renderLoginForm}/>
          <Route exact path = "/attending" component={this.renderMyEventContainer}/>
        </div>
      </Router>
    )
  }
}

export default App;
