/* Location/Map page */
import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import LocationServiceApi from '../api/LocationServiceApi.js';
import "../styles/map.css";


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      activeMarker: {},
      showingInfoWindow: false,
      selectedPlace: {}
    };
  }

  componentDidMount() {
    // obtain all locations
    let location_array = this.state.locations;
    // Get all locations from backend
    LocationServiceApi.getAllLocations().then(res => {
      const data = res.data;
      // Iterate through each address and get latitude and longitude
      data.forEach(element => {
        LocationServiceApi.getGeocodeFromAddress(element.address)
          .then(res => {
            // Create object with address, latitude and longitude
            let object = {
              id: element._id,
              address: element.address,
              name: element.name,
              lat: res.data.results[0].geometry.location.lat,
              lng: res.data.results[0].geometry.location.lng,
              cars: element.cars
            };
            // Push address, lat, long as object to react state array
            location_array.push(object);
            this.setState({
              locations: location_array
            });
          });
      });
    });
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div style={{ height: "100vh" }}>
         <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
            lat: 14.5907332,
            lng: 120.9809674
        }}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Pahatid Express'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}



export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);



            