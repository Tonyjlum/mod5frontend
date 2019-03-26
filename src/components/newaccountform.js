import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter} from "react-router-dom"
import * as Const from '../const.js'

class NewAccountFrom extends Component {
  state = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`${Const.ENDPOINT}${this.props.accountType}`,{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name
      })
    })
    .then(response => response.json())
    .then(user => {
      this.props.addLoginAccountToStore(user)
      //make a message letting user know that they made a new account and maybe how to navigate the website
      this.props.history.push("/login")
    })
    // set the current to user and send the user to the search page after
    // .then( newAccount => console.log(newAccount))
  }


  render() {
    return (
      <Form
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        className="justify-content-md-center"
      >
      <Col xs lg="12">
      <h1>Welcome to Helping Hand</h1>
      <br/><br/>
      <Form.Group controlId="first_name">
        <Form.Label>First Name:</Form.Label>
        <Form.Control type="text" value={this.state.first_name} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="last_name">
        <Form.Label>Last Name:</Form.Label>
        <Form.Control type="text" value={this.state.last_name} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" placeholder="yourname@example.com" value={this.state.email} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={this.state.password} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit" >
        Make Account
      </Button>
      </Col>
      </Form>
    );
  }

}

const mapDispatchToProps = {
  addLoginAccountToStore: (account) => ({type: "ADD_LOGIN_ACCOUNT_TO_STORE", payload: account})
}


export default withRouter(connect(null, mapDispatchToProps) (NewAccountFrom))
