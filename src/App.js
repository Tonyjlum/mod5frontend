import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css'
import NavigationBar from './components/navbar.js'
import UserContainer from './container/user_container.js'
import Homepage from './components/homepage.js'
import NewUserContainer from './container/newusercontainer.js'
import LoginForm from './components/loginform.js'
import MyEventContainer from './container/myeventcontainer.js'
import DonationContainer from './container/donationscontainer.js'
import About from "./components/about.js"
import { connect } from 'react-redux'
import * as Const from './const.js'

import {BrowserRouter as Router, Route} from "react-router-dom"


class App extends Component {

  renderHomepage = () => {
    return <Homepage />
  }
  renderStatic = () => {
    return <NavigationBar />
  }

  renderUserContainer = () => {
    return <UserContainer />
  }

  renderNewMemeber = () => {
    return <NewUserContainer />

  }

  renderLoginForm = () =>{
    return <LoginForm />
  }

  renderMyEventContainer = () => {
    return <MyEventContainer />
  }

  renderMyDonationContainer = () => {
    return <DonationContainer />
  }
  renderAbout = () => {
    return <About />
  }

  componentDidMount() {
    const token = localStorage.getItem("user")
    const accountType = localStorage.getItem("accountType")
    if (token) {
      fetch(`${Const.ENDPOINT}${accountType}/${token}`)
      .then(response => response.json())
      .then( user => {
        this.props.addLoginAccountToStore(user)
        if (accountType === "sponsors") {
          this.props.markSponsorInStore()
        }
      })

    }
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
          <Route exact path = "/contribution" component={this.renderMyDonationContainer} />
          <Route exact path = "/about" component={this.renderAbout} />

        </div>
      </Router>
    )
  }
}
const mapDispatchToProps = {
  addLoginAccountToStore: (account) => ({type: "ADD_LOGIN_ACCOUNT_TO_STORE", payload: account}),
  markSponsorInStore: () => ({
    type:"LOGGED_IN_AS_SPONSOR"
  })
}

export default connect(null, mapDispatchToProps)(App);
