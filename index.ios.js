import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import MyMap from './MyMap';

const RootApp = StackNavigator({
  Home  : { screen: Home },
  MyMap : { screen: MyMap },
});

AppRegistry.registerComponent('reactnativetest', () => RootApp);
