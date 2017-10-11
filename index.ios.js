import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MyMap from './MyMap';

const RootApp = StackNavigator({
  Home: { screen: MyMap },
});

AppRegistry.registerComponent('reactnativetest', () => RootApp);
