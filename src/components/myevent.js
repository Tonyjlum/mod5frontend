import React from 'react'
import {Card, Button, Col, Row} from 'react-bootstrap'
import { connect } from 'react-redux'


function renderButtons(props) {
  if (props.event.coordinator_id === props.currentUser){
    return(
      <div className="space-button">
        <Button variant="outline-secondary" size="sm">Edit Event</Button>
        <Button variant="outline-danger" size="sm">Delete Event</Button>
      </div>
    )
  } else {
    return (<Button variant="outline-danger" size="sm" onClick={()=>{handleLeave(props.confirm)}}>Leave Event</Button>)
  }
}

const handleLeave = (event) => {
  console.log(event)
  fetch(`http://localhost:3000/confirms/${event.id}`, {
    method: "DELETE"
  })
  // .then(response => response.json())
  // .then( json => this.removeConfirmFromCurrentUser(json.destroyed_confirm_id) )
}


const MyEvent = (props) => {
  return (
    <div>
    <Card.Body className="my-event-card">
    <Card className="text-center">
    <Row className="justify-content-md-center">
    <Col xs={7} className>
      <Card.Body>
        <Card.Title>{props.event.title}</Card.Title>
        <Card.Text>
          {props.event.description}
        </Card.Text>
      </Card.Body>
      {renderButtons(props)}
      </Col>
      </Row>
    </Card>
    </Card.Body>
    </div>
  )
}

const mapDispatchToProps = {
  removeConfirmFromCurrentUser: (id) => ({type: "REMOVE_CONFIRM_FROM_CURRENT_USER", payload: id})
}


export default connect(null, mapDispatchToProps)(MyEvent)
