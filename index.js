/**
 * @format
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SplashScreen from './src/components/splash';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {currentScreen: 'SplashScreen'};
    console.log('Wait for 3 seconds');
    setTimeout(() => {
      console.log('Done');
      this.setState({currentScreen: 'App'});
    }, 3000);
  }
  render() {
    const {currentScreen} = this.state;
    let mainScreen =
      currentScreen === 'SplashScreen' ? <SplashScreen /> : <App />;
    return mainScreen;
  }
}

AppRegistry.registerComponent(appName, () => Main);
