import React, { Component } from 'react';
import {Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter} from "react-router-dom"
import * as Const from '../const.js'

class GuestSponsorButton extends Component {

  handleClick = () =>{
    fetch(`${Const.ENDPOINT}sponsors/login`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: "TestAccount@gmail.com",
        password: "123"
      })
    })
    .then(response => response.json())
    .then(sponsorAccount => {
      this.props.removeCurrentUser()
      localStorage.removeItem("user")
      this.props.markSponsorInStore()
      this.props.addLoginAccountToStore(sponsorAccount)
      localStorage.setItem("user", sponsorAccount.id)
      localStorage.setItem("accountType", "sponsors")
      this.props.history.push("/events")
    })
  }

  render() {
    return (
      <Button
        onClick={this.handleClick}
        variant="info"
        size= "sm"
      >Sponsor Test Account</Button>
    );
  }
}

const mapDispatchToProps = {
  addLoginAccountToStore: (account) => ({
    type: "ADD_LOGIN_ACCOUNT_TO_STORE",
    payload: account
  }),
  markSponsorInStore: () => ({
    type:"LOGGED_IN_AS_SPONSOR"
  }),
  removeCurrentUser: () => ({
    type:"REMOVE_CURRENT_USER",
    payload: {id: null}})
}

export default withRouter(connect(null, mapDispatchToProps)(GuestSponsorButton))
