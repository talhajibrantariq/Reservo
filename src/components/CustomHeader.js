import React, {Component} from 'react';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {View, Text, StyleSheet, Button} from 'react-native';

import {Header, Body, Title, Content, Left, Icon, Right} from 'native-base';
import {SafeAreaView} from 'react-navigation';
import {TouchableOpacity} from 'react-native-gesture-handler';

class CustomHeader extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({loading: false});

    console.log('componentDidMount');
  }
  render() {
    if (this.state.loading) {
      return <View />;
    }
    return (
      <Header style={styles.container}>
        <Left>
          <Icon
            name="ios-menu"
            android="md-menu"
            style={{fontSize: 30}}
            onPress={() => console.log('Menu pressed')}
          />
        </Left>
        <Body style={styles.colors}>
          <Title style={{color: 'black', fontSize: 20}}>
            {this.props.title}
          </Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'row',
    marginTop: 40,
    backgroundColor: 'rgb(99, 50, 128)',
  },
  colors: {
    alignContent: 'center',
  },
});
