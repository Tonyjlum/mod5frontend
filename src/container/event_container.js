import React, { Component } from 'react';
import Event from '../components/event.js'
import { CardColumns, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import NewEvent from '../components/newevent.js'

class EventContainer extends Component {

  componentDidMount() {
    fetch("http://localhost:3000/events")
    .then(reponse => reponse.json())
    .then(events => this.props.addEventsToStore(events))
  }

  filteredEvents = () => {
    return this.props.events.filter( event => {
      return Date.parse(event.datetime) > Date.parse(new Date())
    })
  }

  renderEventCards = () => {
    return this.filteredEvents().map( event => {
      const total_donation = event.donations.map( e => e.amount_per_volunteer).reduce((a,b) => a + b, 0)
      return <Event key={event.id} event={event} donation={total_donation} changeLocation={this.changeLocation}/>
  })
  }

  changeLocation = (event) => {
  const position = {latitude: event.lat, longitude: event.long }
  this.props.addLocationToStore(position)
  }

  render() {
    return (
      <div className="event-container">
      {!this.props.sponsor_logged_in && <NewEvent/>}
      <br/>
        <CardColumns className="event-card-columns">
        {this.renderEventCards()}
        </CardColumns>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {events: state.events, sponsor_logged_in: state.sponsor}
}

const mapDispatchToProps = {
  addEventsToStore: (events) => ({type: "ADD_EVENTS", payload: events}),
    addLocationToStore: (location) => ({type: "ADD_CURRENT_LOCATION", payload: location})
}


export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);
