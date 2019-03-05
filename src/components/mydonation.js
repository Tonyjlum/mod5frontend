import React, { Component } from 'react';
import {Card, Button, Col, Row} from 'react-bootstrap'

class MyDonation extends Component {

  render() {
    return (
      <Card.Body className="my-donation-card">
        <Card className="text-center">
          <Row className="justify-content-md-center">
            <Col xs={7} className>
              <Card.Body>
                <Card.Title>
                {this.props.donation.event_title}
                {this.props.donation.event_description}
                </Card.Title>
                <Card.Text>
                  {this.props.donation.event_description}
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
