import React, { Component } from 'react';
import {Card, Col, Row} from 'react-bootstrap'

class MyDonation extends Component {

  numberOfVolunteer = () => {
    if (Date.parse(this.props.donation.event_datetime) > Date.parse(new Date())) {
      return `${this.props.donation.current_number_of_confirms} volunteers signed up`
    } else {
      return `Number of attendees: ${this.props.donation.number_of_attended}`
    }
  }

  volunteerCount = () => {
    if (Date.parse(this.props.donation.event_datetime) > Date.parse(new Date())){
      return `${this.props.donation.max_volunteers} spots open`
    } else {
      return `$${this.props.donation.total_donation_for_event}.00 contributed for this event `
    }
  }



  render() {
    return (
      <Card.Body className="my-donation-card">
        <Card className="text-center">
          <Row className="justify-content-md-center">
            <Col xs={7} className>
              <Card.Body>
                <Card.Title>
                  {this.props.donation.event_title}
                </Card.Title>
                <Card.Text>
                  {this.props.donation.event_description}
                  <br/>
                  {`Contribution per volunteer: $${this.props.donation.amount_per_volunteer}.00`}
                  <br/>
                  {this.numberOfVolunteer()}
                </Card.Text>
              </Card.Body>
              <Card.Body>
              <Card.Text>
                {this.volunteerCount()}
              </Card.Text>
              </Card.Body>

              </Col>
            </Row>
        </Card>
      </Card.Body>
    );
  }

}

export default MyDonation;
