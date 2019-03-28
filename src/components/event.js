import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap'
import Moment from 'react-moment';
import { connect } from 'react-redux'
import DonationModal from './donationmodal.js'
import * as Const from '../const.js'

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
        return slot > 0 ? <Button disabled={this.state.userButtonToggle} onClick={() => {this.handleClick(this.props.event.id)}} size="sm"> {`Join: ${slot} slots left`}</Button> : `This event is full`
      }
  }

  sponsorButton = () => {
    const sponsor_ids = this.props.event.donations.map( donation => donation.sponsor_id)
    if (sponsor_ids.includes(this.props.state.currentUser.id)){

    } else {
      return(<Button
        size="sm"
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
    fetch(`${Const.ENDPOINT}confirms`,{
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
    .then(fetch(`${Const.ENDPOINT}events`)
      .then(response => response.json())
      .then (events => this.props.addEventsToStore(events))
    )
    //do a filter return for the events to froce rerender, confirm_event_info has evens, look for it and send it back.
  }

  sponsorCount = () => {
    if (this.props.event.donations.length > 1) {
      return ` ${this.props.event.donations.length} sponsors`
    } else {
      return " a sponsor"
    }
  }

  eventDiscription = () =>{
    if (this.props.event.description.length > 160) {
      return `${this.props.event.description.slice(0,157)}...`
    } else {
      return this.props.event.description
    }
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
          <Card.Text><small>{this.eventDiscription()}</small></Card.Text>
          <Card.Text>
            <small>
              <Moment locale="en" format="MMMM DD, YYYY" className= "date-event-card">{this.props.event.datetime}</Moment>
              &nbsp;at&nbsp;
              <Moment format="LT" className="time-event-card">{this.props.event.datetime}</Moment>
            </small>
          </Card.Text>
          {this.props.state.sponsor ? this.sponsorButton() :this.userButton()}
        </Card.Body>
        <Card.Footer>
        <small> Coordinated by: {this.props.event.coordinator_name}</small> <br/>
          <small className="text-muted">{
            this.props.donation ? `This project has been funded: $ ${this.props.donation} by ${this.sponsorCount()}` : "This project has not been funded"
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
