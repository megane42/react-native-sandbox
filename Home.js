import React            from 'react';
import { View, Button } from 'react-native';

export default class Home extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render = () => {
    // 全ての screen (react-navigation の庇護の下にあるコンポーネント) には navigation という prop が与えられる。
    // navigation には navigate というメソッドが定義されていて、ここではそれを「分割代入」している。
    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button onPress={() => navigate('MyMap')} title="Go to My Pretty Map" />
      </View>
    );
  }
}
