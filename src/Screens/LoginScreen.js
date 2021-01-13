import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
} from 'react-native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Login Screen</Text>
      </View>
    );
  }
}
