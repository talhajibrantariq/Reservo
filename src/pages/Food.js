import React, {Component} from 'react';
import {
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
var {height, width} = Dimensions.get('window');
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import restaurantsData from '../api/restaurants.json';
import RestaurantItem from '../components/RestaurantItem';
import Restaurant from '../components/Restaurants';
import CartButton from '../common/CartButton';
import Axios from 'axios';

export default class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Restaurants',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
      headerRight: () => (
        <CartButton
          onPress={() => {
            navigation.navigate('Cart');
          }}
        />
      ),
    };
  };

  componentWillMount() {
    Axios.get('');
  }

  render() {
    return (
      <View>
        <Restaurant />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 32,
    fontWeight: 'bold',
  },
});
