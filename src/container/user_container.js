import React, { Component } from 'react';
import EventContainer from './event_container.js'
import Map from '../components/map.js'


class UserContainer extends Component {

  render() {
    return (
      <div className= "user-container">
        <Map />
        <EventContainer />
      </div>
    );
  }

}

export default UserContainer;
