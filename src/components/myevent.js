import React, { Component } from 'react';
import {Card, Button, Col, Row} from 'react-bootstrap'
import { connect } from 'react-redux'

class MyEvent extends Component {
  renderButtons = (props) => {
    if (props.event.coordinator_id === props.currentUser){
      return(
        <div className="space-button">
          <Button variant="outline-secondary" size="sm">Edit Event</Button>
          <Button variant="outline-danger" size="sm">Delete Event</Button>
        </div>
      )
    } else {
      return (<Button variant="outline-danger" size="sm" onClick={()=>{this.handleLeave(props.confirm)}}>Leave Event</Button>)
    }
  }

  handleLeave = (event) => {
    console.log(event)
    fetch(`http://localhost:3000/confirms/${event.id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .then( deleted_event_id => this.props.removeConfirmFromCurrentUser(deleted_event_id)
  )
  }

  render(){
    return (
      <div>
      <Card.Body className="my-event-card">
      <Card className="text-center">
      <Row className="justify-content-md-center">
      <Col xs={7} className>
        <Card.Body>
          <Card.Title>{this.props.event.title}</Card.Title>
          <Card.Text>
            {this.props.event.description}
          </Card.Text>
        </Card.Body>
        {this.renderButtons(this.props)}
        </Col>
        </Row>
      </Card>
      </Card.Body>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {state}
}


const mapDispatchToProps = {
  removeConfirmFromCurrentUser: (updated_confrim) => ({type: "REMOVE_CONFIRM_FROM_CURRENT_USER", payload: updated_confrim})
}


export default connect(mapStateToProps, mapDispatchToProps)(MyEvent)
