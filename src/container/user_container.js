import React, { Component } from 'react';
import EventContainer from './event_container.js'
import MapDisplay from '../components/map.js'


class UserContainer extends Component {

  render() {
    return (
      <div className= "user-container">
        <MapDisplay className="map-display" />
        <EventContainer className="event-container" />
      </div>
    );
  }

}

export default UserContainer;
