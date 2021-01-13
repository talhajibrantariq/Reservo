import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  AsyncStorage,
} from 'react-native';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Logout"
          onPress={() => {
            AsyncStorage.removeItem('isLoggedIn');
            let stackNav = this.props.route.params.stackNav;
            stackNav.navigate('Login');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  Row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
