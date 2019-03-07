import React, { Component } from 'react';
import {Form, Button, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter} from "react-router-dom"

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    accountType: "users",
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    }, console.log(this.state))
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch(`http://${window.location.hostname}:3000/${this.state.accountType}/login`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(account => {
      localStorage.setItem("user", account.id)
      localStorage.setItem("accountType", this.state.accountType)
      this.props.addLoginAccountToStore(account)
      this.props.history.push("/events")
      console.log(this.state.accountType, "after login")
      if (this.state.accountType === "sponsors"){
        this.props.markSponsorInStore()
      }
    })
  }

  render(){
    return(
      <Form
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        className="justify-content-md-center "
      >
      <Col xs lg="6">
      <h1 align= "center">Welcome to Helping Hand</h1>
      <br/><br/>
      <Form.Group controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" value={this.state.email} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={this.state.password} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <div className="radio-button">
        <input type="radio" id="accountType" name="accountType" value="sponsors" /> Sponsor
        &nbsp;&nbsp;
        <input type="radio" id="accountType" name="accountType" value="users" checked/> Volunteer

      </div><br/><br/>

      <Button variant="primary" type="submit" >
        Login
      </Button>
      </Col>
      </Form>
    )
  }

}
const mapDispatchToProps = {
  addLoginAccountToStore: (account) => ({type: "ADD_LOGIN_ACCOUNT_TO_STORE", payload: account}),
  markSponsorInStore: () => ({
    type:"LOGGED_IN_AS_SPONSOR"
  })
}


export default withRouter(connect(null, mapDispatchToProps)(LoginForm))
