import React, { PureComponent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import ConfirmVolunteer from '../components/confirmvolunteers.js'

class ConfirmContainer extends PureComponent {
  state= {
    confirms: []
  }

  //fetch for all confirms when mounting
  componentDidMount(){
    fetch(`http://localhost:3000/events/${this.props.event.id}`)
    .then(response => response.json())
    .then(current_event => {this.setState({
      confirms: current_event.confirms
    })}
    )
  }

  renderConfrims = () => {
    return (this.state.confirms.map( confirm => {
      return <ConfirmVolunteer confirm={confirm} handleRadio={this.handleRadio}/>
    }))
  }

  handleRadio = (id, value) => {
    console.log(id, value)
    this.setState({
      confirms: this.state.confirms.map( c => {
        if (c.id == id){
          return {...c, attend: (value === "true" ? true : false)}
        } else {
          return c
        }
      })
    }, () => console.log(this.state.confirms))
  }

  handleSubmit = (props) => {
    this.props.onHide()
    const attended_id = this.state.confirms.filter( c => {
      return c.attend
    }).map( c => {
      return c.id
    })
    console.log("from confirm submit", attended_id)
    fetch(`http://localhost:3000/confirms/update_confirms`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({attended_id})
    })
    .then( response => response.json())
    .then( attended_ids => console.log(attended_ids))
  }


  render() {
    return (
      <Modal
        className="confirm-volunteer"
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
            <Form>
              {this.renderConfrims()}
            </Form>
          </Modal.Body>
          {"this should render confirms"}
          <Modal.Footer>
            <Button onClick={this.props.onHide} >Close</Button>
            <Button onClick={this.handleSubmit} >Submit Confirms</Button>

          </Modal.Footer>
      </Modal>
    );
  }

}

export default ConfirmContainer;
