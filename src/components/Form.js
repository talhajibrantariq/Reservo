/* eslint-disable no-trailing-spaces */
/* eslint-disable jsx-quotes */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Hoshi} from 'react-native-textinput-effects';
import {validateAll} from 'indicative/validator';
import Axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AsyncStorage} from 'react-native';
import FlatButton from '../asset/button';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: {},
      userData: '',
      inavlidLogin: false,
    };
  }

  registerUser = async data => {
    const rules = {
      name: 'required|string',
      email: 'required|email',
      password: 'required|string|min:6|confirmed',
    };

    const messages = {
      required: field => `${field} is required`,
      'email.email': ' The email is required ',
      'password.confirmed': 'The password confimration failed',
      'password.min': 'Password is too short',
    };

    console.log(this.state);

    if (this.props.type == 'Login') {
      let formdata = new FormData();
      formdata.append('email', this.state.email);
      formdata.append('password', this.state.password);

      Axios({
        method: 'post',
        url: 'https://reservo-app.com/reservo/user/login',
        withCredentials: true,
        crossdomain: true,
        data: formdata,
        headers: {
          Accept: 'application/json',
        },
      })
        .then(
          function(response) {
            //handle success
            let status = response.data.status;

            if (status == 'error') {
              this.setState({inavlidLogin: true});
            } else {
              let userDetail = response.data.users_detail;
              let navigationProp = this.props.navigation;
              AsyncStorage.setItem('isLoggedIn', 'true');
              navigationProp.navigate('Home', {user: userDetail});
            }
          }.bind(this),
        )
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    } else {
      let formdata = new FormData();
      formdata.append('useremail', this.state.email);
      formdata.append('userpass', this.state.password);
      formdata.append('username', this.state.name);
      formdata.append('user_lat', '123');
      formdata.append('user_lng', '123');
      formdata.append('user_address', '123');
      formdata.append('user_phoneno', '123');
      formdata.append('userid', '');
      formdata.append('status', '');

      Axios({
        method: 'post',
        url: 'https://reservo-app.com/reservo/user/signup',
        withCredentials: true,
        crossdomain: true,
        data: formdata,
        headers: {
          Accept: 'application/json',
        },
      })
        .then(
          function(response) {
            //handle success
            let status = response.data.status;

            if (status == 'error') {
              this.setState({inavlidLogin: true});
            } else {
              let navigationProp = this.props.navigation;
              navigationProp.push('Login');
            }
          }.bind(this),
        )
        .catch(function(response) {
          //handle error
          console.log(response);
        });
    }
  };

  render() {
    const navigationProp = this.props.navigation;

    const formType = this.props.type;

    return (
      <View style={styles.container}>
        {formType != 'Login' && (
          <View>
            <Hoshi
              style={styles.inputBox}
              label={'Name'}
              borderColor={'#AA26DA'}
              borderHeight={3}
              inputPadding={16}
              value={this.state.name}
              onChangeText={name => this.setState({name})}
            />
            {this.state.error.name && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                  marginBottom: 5,
                  paddingLeft: 10,
                }}>
                {this.state.error.name}
              </Text>
            )}
          </View>
        )}

        <Hoshi
          style={styles.inputBox}
          label={'Email'}
          borderColor={'#AA26DA'}
          borderHeight={3}
          inputPadding={16}
          value={this.state.email}
          onChangeText={email => this.setState({email})}
        />
        {this.state.error.email && (
          <Text
            style={{
              fontSize: 12,
              color: 'red',
              marginBottom: 5,
              paddingLeft: 10,
            }}>
            {this.state.error.email}
          </Text>
        )}

        <Hoshi
          style={styles.inputBox}
          label={'password'}
          secureTextEntry
          borderColor={'#AA26DA'}
          borderHeight={3}
          inputPadding={16}
          value={this.state.password}
          onChangeText={password => this.setState({password})}
        />
        {this.state.error.password && (
          <Text
            style={{
              fontSize: 12,
              color: 'red',
              marginBottom: 5,
              paddingLeft: 10,
            }}>
            {this.state.error.password}
          </Text>
        )}

        {formType != 'Login' && (
          <View>
            <Hoshi
              style={styles.inputBox}
              label={'Confirm password'}
              secureTextEntry
              borderColor={'#AA26DA'}
              borderHeight={3}
              inputPadding={16}
              value={this.state.password_confirmation}
              onChangeText={password_confirmation =>
                this.setState({password_confirmation})
              }
            />
            {this.state.error.password_confirmation && (
              <Text
                style={{
                  color: 'red',
                  marginBottom: 5,
                  fontSize: 12,
                  paddingLeft: 10,
                }}>
                {this.state.error.password_confirmation}
              </Text>
            )}
          </View>
        )}

        <View>
          <FlatButton
            text={this.props.type}
            onPress={() => {
              this.registerUser(this.state);
            }}
          />
        </View>

        {this.state.inavlidLogin && (
          <Text style={{color: 'red'}}>Invalid Credentials</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: 300,
    backgroundColor: '#f1f9f9',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#AA26DA',
    marginVertical: 10,
  },
  button: {
    width: 300,
    backgroundColor: '#AA26DA',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});
