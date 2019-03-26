import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import * as Const from '../const.js'

const RESETSTATE = {
  datetime: "",
  title: "",
  discription: "",
  max_volunteers: "",
  address: "",
  lat: 0,
  long: 0
}

class NewEvent extends Component {
  state = RESETSTATE

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }


  handleSubmit = (e) => {
    e.preventDefault()
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.address}&key=AIzaSyA-kXyO4hu_HuTp2rb36ub5Adun3uY88n8`)
    .then(response => response.json())
    .then(geolocation => this.setState({
      lat: geolocation.results[0].geometry.location.lat,
      long: geolocation.results[0].geometry.location.lng
    }, () => this.postNewEvent()))
  }

  postNewEvent = () => {
    fetch(`${Const.ENDPOINT}events`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        coordinator_id: this.props.state.currentUser.id,
        datetime: this.state.datetime,
        title: this.state.title,
        max_volunteers: this.state.max_volunteers,
        address: this.state.address,
        description: this.state.discription,
        lat: this.state.lat,
        long: this.state.long
      })
    })
    .then(response => response.json())
    .then(json => {
      this.props.addEventToStore(json)
      fetch(`${Const.ENDPOINT}users/${json.coordinator_id}`)
      .then(response => response.json())
      .then(json => this.props.addEventsToUser(json))
    })
    //add event and confirm to currentUser state
    .then(() => this.setState(RESETSTATE))
  }


  render() {

    return (
      <Form
        className= "new-event-form"
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}>
        <Row>
            <Col xs={5}>
            <Form.Group controlId="title">
              <Form.Label>Event Title:</Form.Label>
              <Form.Control
                type="text"
                value={this.state.title}
                size="sm"/>
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            </Col>
            <Col xs={7}>
            <Form.Group controlId="discription">
              <Form.Label>Discription: </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. clean up the trash from Coney Island"
                value={this.state.discription}
                size="sm" />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>
            </Col>
        </Row>
        <Row>
          <Col xs={5}>
          <Form.Group controlId="address">
            <Form.Label>Address: </Form.Label>
            <Form.Control
              type="text"
              value={this.state.address}
              size="sm"
               />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          </Col>
          <Col xs={2}>
          <Form.Group controlId="max_volunteers">
            <Form.Label>Volunteers:</Form.Label>
            <Form.Control
              type="number"
              value={this.state.max_volunteers}
              size="sm"
               />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          </Col>
          <Col xs={5}>
          <Form.Group controlId="datetime">
            <Form.Label>Date and Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={this.state.datetime.slice(0,16)}
              size="sm"
               />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="btn-small">
          Plan the event!
        </Button>
      </Form>
    );
  }

}

const mapStateToProps = (state) => {
  return {state}
}

const mapDispatchToProps = {
  addEventToStore: (event) => ({type: "ADD_NEW_EVENT", payload: event}),
  addEventsToUser:(user) =>({type:"ADD_LOGIN_ACCOUNT_TO_STORE", payload:user})
}


export default connect(mapStateToProps, mapDispatchToProps)(NewEvent)
