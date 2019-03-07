import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
class DonationModal extends Component {
  state = {
    donationAmount: 5
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    }, () => {console.log(this.state)})
  }
  handleSubmit = () => {
    this.props.onHide()
    console.log(this.props.event.id, this.props.state.currentUser.id, this.state.donationAmount, "handle sub")
    fetch(`http://${window.location.hostname}:3000/donations`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        event_id: this.props.event.id,
        sponsor_id: this.props.state.currentUser.id,
        amount_per_volunteer: this.state.donationAmount
      })
    })
    .then(response => response.json())
    .then( json => {
      this.props.addToDonations(json  )
      const updatedEvents = this.updateEvents(this.updateEventDonations(json))
      this.props.UpdateEvents(updatedEvents)
    })

  }

  updateEvents = (new_event) => {
    return this.props.state.events.map( event => {
      if (new_event.id === event.id) {
        return new_event
      } else {
        return event
      }
    })
  }

  updateEventDonations = (new_donation) => {
    return {...this.props.event, donations: [...this.props.event.donations, new_donation]}
  }

  render() {

    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show= {this.props.show}
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
          {this.props.event.title}
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.event.description}
          </Modal.Body>
          <Modal.Body>
          <Form onChange={this.handleChange} >
            <Form.Group controlId="donationAmount">
              <Form.Label>Your Contribution</Form.Label>
              <Form.Control
                type="number"
                defaultValue={this.state.donationAmount}
                min = "5"
                max = "200"
                />
              <Form.Text className="text-muted" >
              </Form.Text>
          </Form.Group>
          </Form>

          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onHide} >Close</Button>
            <Button onClick={this.handleSubmit} >Sponsor Event</Button>

          </Modal.Footer>
      </Modal>
    );
  }

}

const mapStateToProps = (state) => {
  return {state}
}

const mapDispatchToProps = {
  addToDonations: (donation) => ({
    type: "ADD_DONATIONS_TO_USER",
    payload: donation
  }),
  UpdateEvents: (updated_confrim) => ({
    type: "ADD_DONATIONS_TO_EVENT",
    payload: updated_confrim
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(DonationModal)
