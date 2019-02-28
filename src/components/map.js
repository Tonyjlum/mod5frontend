import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { connect } from 'react-redux'

//alt map link
//"https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png"
class MapDisplay extends Component {

  componentDidMount(){
    navigator.geolocation.getCurrentPosition( position => {
      this.props.addLocationToStore(position.coords)})
  }

  renderPin = () => {
    let currentIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
      iconSize: [18, 30]
    })
    return this.props.events.map( (event, index) => {
      const position = [event.lat, event.long]
      return (
        <Marker key={index} position={position} icon={currentIcon}>
          <Popup>
            {event.description}
          </Popup>
        </Marker>
      )
    })
  }

  render() {
    return (
      <Map
        className= "map-display"
        animate={true}
        style={{height: '93vh', width: '100%' }}
        center={this.props.location}
        zoom={14}>
        <TileLayer
          // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png"
        />
        {this.renderPin()}
      </Map>
    )
  }

}

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = {
  addLocationToStore: (location) => ({type: "ADD_CURRENT_LOCATION", payload: location})
}


export default connect(mapStateToProps, mapDispatchToProps)(MapDisplay)
