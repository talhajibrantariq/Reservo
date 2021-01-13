import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import Constants from '../utils/constants';
import foodData from '../food-data.json';
import ListItem from './ListItem';
import CartButton from '../common/CartButton';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

class Dishes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      no_cartItem: 0,
      dishes: [],
    };

    this.increaseCartCount = this.increaseCartCount.bind(this);
  }

  async componentWillMount() {
    let resId = this.props.route.params.res_id;
    let formdata = new FormData();

    console.log('res', resId);
    formdata.append('resid', resId);

    let dishes_list = await Axios({
      method: 'post',
      url: 'https://reservo-app.com/reservo/user/get_prdoduct_list_by_resid',
      withCredentials: true,
      crossdomain: true,
      data: formdata,
      headers: {
        Accept: 'application/json',
      },
    });

    this.setState({dishes: dishes_list.data});

    console.log(this.state.dishes);

    const Cart = AsyncStorage.getItem('Cart').then(cart => {
      if (cart !== null) {
        let items = JSON.parse(cart);
        this.setState({no_cartItem: items.length});
      }
    });
  }

  increaseCartCount() {
    this.setState({no_cartItem: this.state.cart++});
  }

  async handleNaviagation(item) {
    console.log(item);

    const value = AsyncStorage.getItem('isLoggedIn').then(val => {
      if (val !== null) {
        const Cart = AsyncStorage.getItem('Cart').then(cart => {
          if (cart !== null) {
            let items = JSON.parse(cart);
            items.push(item);
            this.setState({no_cartItem: items.length});
            AsyncStorage.setItem('Cart', JSON.stringify(items));
            console.log(items);
          } else {
            let items = [];
            items.push(item);
            this.setState({no_cartItem: items.length});
            AsyncStorage.setItem('Cart', JSON.stringify(items));
          }
        });
      } else {
        let ParentStackNav = this.props.route.params.stackNav;
        ParentStackNav.navigate('Login');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.Row}>
          <Text style={styles.title}>Foods</Text>
          <CartButton
            length={this.state.no_cartItem}
            bottomNavigator={this.props.route.params.bottomNavigator}
          />
        </View>
        <FlatList
          data={this.state.dishes}
          keyExtractor={item => item.productid}
          renderItem={({item}) => (
            <ListItem
              name={item.product_name}
              image={item.image_url}
              description={item.product_description}
              price={'Rs' + item.product_price}
              handleNavigation={() => this.handleNaviagation(item)}
            />
          )}
        />
      </View>
    );
  }
}

export default Dishes;

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
