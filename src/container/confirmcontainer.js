import React, { PureComponent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import ConfirmVolunteer from '../components/confirmvolunteers.js'
import * as Const from '../const.js'

class ConfirmContainer extends PureComponent {
  state= {
    confirms: []
  }

  componentDidMount(){
    fetch(`${Const.ENDPOINT}events/${this.props.event.id}`)
    .then(response => response.json())
    .then(current_event => {this.setState({
      confirms: current_event.confirms
    })}
    )
  }

  renderConfrims = () => {
    return (this.state.confirms.map( confirm => {
      return <ConfirmVolunteer key={confirm.id} confirm={confirm} handleRadio={this.handleRadio}/>
    }))
  }

  handleRadio = (id, value) => {
    this.setState({
      confirms: this.state.confirms.map( c => {
        if (c.id === id){
          return {...c, attend: (value === "true" ? true : false)}
        } else {
          return c
        }
      })
    })
  }

  handleSubmit = (props) => {
    this.props.onHide()
    const attended_id = this.state.confirms.filter( c => {
      return c.attend
    }).map( c => {
      return c.id
    })
    fetch(`${Const.ENDPOINT}confirms/update_confirms`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({attended_id})
    })
    // .then( response => response.json())
    // .then( attended_ids => console.log(attended_ids))
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
              <div id="confirm-users">
              {this.renderConfrims()}
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.props.onHide} >Close</Button>
            <Button onClick={this.handleSubmit} >Submit Confirms</Button>

          </Modal.Footer>
      </Modal>
    );
  }

}

export default ConfirmContainer;
