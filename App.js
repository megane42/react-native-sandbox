import React, { Component } from 'react';
import { Alert, StyleSheet, Image, TouchableHighlight, View } from 'react-native';

export default class Touchables extends Component {
  constructor(props) {
      super(props);
      this.state = {isIdolized: false};
  }

  _onPressButton = () => {
      this.setState({isIdolized: !this.state.isIdolized});
  }

  _getUri = () => {
      return this.state.isIdolized ? "https://imcgdb.info/card-img/3432901.jpg" : "https://imcgdb.info/card-img/3532902.jpg"
  }

  render() {
    let src = {uri: this._getUri()};
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._onPressButton} underlayColor="blue">
            <Image source={src} style={styles.idol}/>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#555555'
  },
  idol: {
      width: 320,
      height: 400,
  },
})
