import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap'

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
    fetch(`http://localhost:3000/${this.props.accountType}`,{
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
      <Col xs lg="5">
      <h1>Welcome to Helping Hand</h1>
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

export default NewAccountFrom;
