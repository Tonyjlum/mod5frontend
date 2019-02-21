import React, { Component } from 'react';
import Event from '../components/event.js'

class EventContainer extends Component {
  state = {
    all_events: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/events")
    .then(reponse => reponse.json())
    .then(json => this.setState({
      all_events: json
    }))
  }

  renderLi = () => {
    return this.state.all_events.map( event => {
      const total_donation = event.donations.map( e => e.amount_per_volunteer).reduce((a,b) => a+b)
      return <Event event={event}/>
    })
  }

  render() {
    return (
      <div>
        {this.renderLi()}
      </div>
    );
  }

}

export default EventContainer;
