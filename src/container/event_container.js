import React, { Component } from 'react';
import Event from '../components/event.js'
import { CardColumns } from 'react-bootstrap'
import { connect } from 'react-redux'
import NewEvent from '../components/newevent.js'

class EventContainer extends Component {

  componentDidMount() {
    fetch("http://localhost:3000/events")
    .then( reponse => reponse.json())
    .then( events => this.props.addEventsToStore(events))
  }



  renderEventCards() {
    return this.props.events.map( event => {
      const total_donation = event.donations.map( e => e.amount_per_volunteer).reduce((a,b) => a + b, 0)
      return <Event key={event.id} event={event} donation={total_donation} />
  })
  }

  render() {

    return (
      <div className="event-container">
      <NewEvent/>
      <br/>
        <CardColumns className="event-card-columns">
        {this.renderEventCards()}
        </CardColumns>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {events: state.events}
}

const mapDispatchToProps = {
  addEventsToStore: (events) => ({type: "ADD_EVENTS", payload: events})
}


export default connect(mapStateToProps, mapDispatchToProps)(EventContainer);
