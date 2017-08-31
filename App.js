import React, { Component } from 'react';
import { Alert, StyleSheet, Image, TouchableHighlight, View, ScrollView } from 'react-native';


class Idol extends Component {
    constructor(props) {
        super(props);
        this.state = {isIdolized: false};
    }
    _onPressButton = () => {
        this.setState({isIdolized: !this.state.isIdolized});
    }
    _getUri = () => {
        return this.state.isIdolized ? this.props.idolizedUri : this.props.unidolizedUri;
    }
    render() {
        let src = {uri: this._getUri()};
        return (
                <TouchableHighlight onPress={this._onPressButton} underlayColor="blue">
                <Image source={src} style={styles.idol}/>
                </TouchableHighlight>
        );
    }
}


export default class Main extends Component {
    render() {
        return (
                <ScrollView maximumZoomScale={10}>
                <Idol idolizedUri="https://imcgdb.info/card-img/3432901.jpg" unidolizedUri="https://imcgdb.info/card-img/3532902.jpg" />
                <Idol idolizedUri="https://imcgdb.info/card-img/3432901.jpg" unidolizedUri="https://imcgdb.info/card-img/3532902.jpg" />
                <Idol idolizedUri="https://imcgdb.info/card-img/3432901.jpg" unidolizedUri="https://imcgdb.info/card-img/3532902.jpg" />
                </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    idol: {
        width: 320,
        height: 400,
    },
})
