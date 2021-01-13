import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import restaurantsData from '../api/restaurants.json';
import RestaurantItem from './RestaurantItem';
import CartButton from '../common/CartButton';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';

export default class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      no_cartItem: 0,
    };
  }

  async componentWillMount() {
    Geolocation.getCurrentPosition(
      async info => {
        console.log(info.coords);
        let formdata = new FormData();

        formdata.append('reslat', '33.726055');
        formdata.append('reslng', '73.057904');

        // formdata.append("reslat", info.coords.latitude)
        // formdata.append("reslng", info.coords.longitude)

        let restaurants_list = await Axios({
          method: 'post',
          url:
            'https://reservo-app.com/reservo/user/get_restuarant_list_by_location',
          withCredentials: true,
          crossdomain: true,
          data: formdata,
          headers: {
            Accept: 'application/json',
          },
        });

        this.setState({restaurants: restaurants_list.data});
      },
      error => {
        console.log(JSON.stringify(error));
      },
    );

    const Cart = AsyncStorage.getItem('Cart').then(cart => {
      if (cart !== null) {
        let items = JSON.parse(cart);
        this.setState({no_cartItem: items.length});
      }
    });
  }

  handleNaviagation(item) {
    this.props.navigation.navigate('Dishes', {
      res_id: item.res_id,
    });
  }

  render() {
    const Cart = AsyncStorage.getItem('Cart').then(cart => {
      if (cart !== null) {
        let items = JSON.parse(cart);
        this.setState({no_cartItem: items.length});
      }
    });
    return (
      <View style={styles.container}>
        {this.state.restaurants.length == 0 && (
          <Text style={styles.LoadingText}>Loading</Text>
        )}

        {this.state.restaurants.length > 0 && (
          <View>
            <View style={styles.Row}>
              <Text style={styles.title}>Restaurants</Text>
              <CartButton
                length={this.state.no_cartItem}
                bottomNavigator={this.props.route.params.bottomNavigator}
              />
            </View>

            <FlatList
              data={this.state.restaurants}
              keyExtractor={item => item.res_id}
              renderItem={({item}) => (
                <RestaurantItem
                  name={item.res_name}
                  location={item.res_address}
                  phoneNumber={item.res_phoneno}
                  handleNaviagation={() => this.handleNaviagation(item)}
                />
              )}
            />
          </View>
        )}
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
  LoadingText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
});
