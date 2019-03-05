import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap'
import Moment from 'react-moment';
import { connect } from 'react-redux'
import DonationModal from './donationmodal.js'

class Event extends Component {
  //save a state for the slot count and cut it off at 0
  state = {
    userButtonToggle: false,
    sponsorButtonToggle: false

  }

  fundedColor = () => {
    return this.props.donation === 0 ? "danger" : "primary"
  }

  userButton = () => {
    const slot = this.props.event.max_volunteers - this.props.event.confirms.length
    const already_attending =
      this.props.event.confirms.map(c => c.user_id).includes(this.props.state.currentUser.id)

      if (already_attending) {
        return <strong>Attending</strong>
      } else {
        return slot > 0 ? <Button disabled={this.state.userButtonToggle} onClick={() => {this.handleClick(this.props.event.id)}}> {`Join: ${slot} slots left`}</Button> : `This event is full`
      }
  }

  sponsorButton = () => {
    const sponsor_ids = this.props.event.donations.map( donation => donation.sponsor_id)
    if (sponsor_ids.includes(this.props.state.currentUser.id)){

    } else {
      return(<Button
        onClick={this.toggleSponsorButton}
      > Sponsor This Event</Button>)

    }
  }

  toggleSponsorButton = () => {
    this.setState({
      sponsorButtonToggle: !this.state.sponsorButtonToggle
    })
  }

  handleClick = (event_id) => {
    this.setState({
      userButtonToggle: !this.state.userButtonToggle
    })
    fetch("http://localhost:3000/confirms",{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.state.currentUser.id,
        event_id: event_id
      })
    })
    .then(response => response.json())
    .then(confirm_event_info => this.props.addConfirms(confirm_event_info))
    .then(fetch("http://localhost:3000/events")
      .then(response => response.json())
      .then (events => this.props.addEventsToStore(events))
    )
    //do a filter return for the events to froce rerender, confirm_event_info has evens, look for it and send it back.
  }

  render(props) {
    return (
      <Card
        border={this.fundedColor()}
        className="shadow"
        onClick={() => this.props.changeLocation(this.props.event)}
        >
        <Card.Body className="shadow-sm">
          <Card.Title>{this.props.event.title}</Card.Title>
          <Card.Text>{this.props.event.description}</Card.Text>
          <Card.Text>
            <Moment locale="en" format="MMMM DD, YYYY" className= "date-event-card">{this.props.event.datetime}</Moment>
            &nbsp;at&nbsp;
            <Moment format="LT" className="time-event-card">{this.props.event.datetime}</Moment>
          </Card.Text>
          {this.props.state.sponsor ? this.sponsorButton() :this.userButton()}
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{
            this.props.donation ? `This project has been funded: $ ${this.props.donation}` : "This project has not been funded"
          }</small>
        </Card.Footer>

        <DonationModal
          show={this.state.sponsorButtonToggle}
          onHide={this.toggleSponsorButton}
          event={this.props.event}
          />
      </Card>
    );
  }

}
const mapStateToProps = (state) => {
  return {state}
}

const mapDispatchToProps = {
  addEventsToStore: (events) => ({type: "ADD_EVENTS", payload: events}),
  addConfirms: (confirm_event_info) => ({type: "ADD_CONFIRMS", payload: confirm_event_info}),
}


export default connect(mapStateToProps, mapDispatchToProps)(Event);
