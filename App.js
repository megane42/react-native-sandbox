import React, { Component } from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        lat: 0,
        lng: 0,
    };
    navigator.geolocation.getCurrentPosition((location) => {
        this.setState({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    });
  }

  takeSnapshot = () => {
    const snapshot = this.map.takeSnapshot({
      width   : 100,
      height  : 100,
      quality : 0.8,
      format  : 'png',
      result  : 'base64'
    });
    snapshot.then((blob) => {
      this.setState({ snapshotBlob: 'data:image/png;base64,' + blob });
    });
  }

  render = () => {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={map => { this.map = map }}
          region={{
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onRegionChangeComplete={(e) => {this.setState({ lat: e.latitude, lng: e.longitude });}}
        />
        <TouchableOpacity onPress={this.takeSnapshot} style={styles.snapshot}>
          <Image source={{uri: this.state.snapshotBlob}} style={styles.image}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : { flex: 2 },
  map       : { flex: 1 },
  snapshot  : { flex: 1 },
  image     : { flex: 1 },
});
