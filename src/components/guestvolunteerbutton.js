import React, { Component } from 'react';
import {Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter} from "react-router-dom"
import * as Const from '../const.js'


class GuestVolunteerButton extends Component {

  handleClick = () =>{
    fetch(`${Const.ENDPOINT}users/login`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: "VolunteerTestAccount@gmail.com",
        password: "123"
      })
    })
    .then(response => response.json())
    .then(volunteerAccount => {
      this.props.removeCurrentUser()
      localStorage.removeItem("user")
      this.props.addLoginAccountToStore(volunteerAccount)
      localStorage.setItem("user", volunteerAccount.id)
      localStorage.setItem("accountType", "users")
      this.props.history.push("/events")
    })
  }

  render() {
    return (
      <Button
        onClick={this.handleClick}
        variant="info"
        size= "sm"
      >Volunteer Test Account</Button>
    );
  }
}

const mapDispatchToProps = {
  addLoginAccountToStore: (account) => ({
    type: "ADD_LOGIN_ACCOUNT_TO_STORE",
    payload: account
  }),
  removeCurrentUser: () => ({
    type:"REMOVE_CURRENT_USER",
    payload: {id: null}})
}


export default withRouter(connect(null, mapDispatchToProps)(GuestVolunteerButton))
