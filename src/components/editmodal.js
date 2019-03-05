import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'


class EditModal extends Component {
  state = {
    description: this.props.event.description,
    datetime: this.props.event.datetime.slice(0,16),
    max_volunteers: this.props.event.max_volunteers
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = () => {
    this.props.onHide()
    fetch(`http://localhost:3000/events/${this.props.event.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        datetime: this.state.datetime,
        max_volunteers: this.state.max_volunteers,
        description: this.state.description
      })
    })
    .then(response => response.json())
    .then( (updated_event) => {
        const updatedCEI = this.updateCEI(updated_event)
        this.props.updateConfirms(updatedCEI)
      })
  }

  updateCEI = (updated_event) => {
    return this.props.state.currentUser.confirm_event_info.map( cei => {
      if (cei.event.id === updated_event.id) {
        return {...cei, event: updated_event}
      } else {
        return cei
      }
    })
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
            Update:  {this.props.event.title}
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onChange={this.handleChange} >
            <Form.Group controlId="description">
              <Form.Label>Event Discription</Form.Label>
              <Form.Control
                type="text"
                defaultValue={this.state.description}/>
              <Form.Text className="text-muted" >
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="datetime">
              <Form.Label>Previous Date and Time:</Form.Label>
              <Form.Control
                type="datetime-local"
                defaultValue={this.state.datetime}
                 />
              <Form.Text className="text-muted">
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="max_volunteers">
              <Form.Label>Volunteers:</Form.Label>
              <Form.Control
                type="number"
                value={this.state.max_volunteers}
                min= {this.props.event.max_volunteers}
                 />
               <Form.Text className="text-muted">
               </Form.Text>
             </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onHide} >Close</Button>
            <Button onClick={this.handleSubmit} >Update Event</Button>

          </Modal.Footer>
      </Modal>
    );
  }

}

const mapStateToProps = (state) => {
  return {state}
}

const mapDispatchToProps = {
  updateConfirms: (updated_confrim) => ({type: "UPDATE_CONFIRMS", payload: updated_confrim})
}



export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
