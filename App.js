import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        lat: 0,
        lng: 0,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((location) => {
        this.setState({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    });
  }

  render() {
    return (
      <MapView
        style={styles.map}
        region={{
          latitude: this.state.lat,
          longitude: this.state.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  map: { ...StyleSheet.absoluteFillObject, },
});
