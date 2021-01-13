import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {timer: 0};
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={require('../images/splash.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
