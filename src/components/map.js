import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { connect } from 'react-redux'
import Pin from './pin.js'
import 'bootstrap/dist/css/bootstrap.min.css'

import { geolocated } from 'react-geolocated';



class MapDisplay extends Component {

  renderPin = () => {
    let currentIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
      iconSize: [18, 30]
    });
    return this.props.events.map( event => {
      const position = [event.lat, event.long]
      return (
        <Marker position={position} icon={currentIcon}>
          <Popup>
            {event.title}
          </Popup>
        </Marker>
      )
    })
  }

  render() {
    console.log("geo location")
    const position = [40.715280, -73.954260]
    return (
      <Map style={{height: '90vh', width: '100%' }} center={position} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.renderPin()}
      </Map>
    )
  }

}
const mapStateToProps = (state) => {
  return {events: state.events}
}
const mapDispatchToProps = {
  addEventsToStore: (events) => ({type: "ADD_EVENTS", payload: events})
}


export default connect(mapStateToProps,mapDispatchToProps)(MapDisplay)
