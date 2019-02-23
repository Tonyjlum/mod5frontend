import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap'
class Event extends Component {

  renderDonations

  render(props) {
    console.log(props)
    return (
        <Card >
          <Card.Body>
            <Card.Title>{this.props.event.title}</Card.Title>
            <Card.Text>{this.props.event.description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{
              this.props.donation ? "This Project is funded" : "This Project is not funded"
            }</small>

          </Card.Footer>
        </Card>
    );
  }

}

export default Event;
