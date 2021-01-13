import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
var {width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import FlatButton from '../asset/button';
import Swipeout from 'react-native-swipeout';

class CartListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
      Cart: [],
    };
  }

  componentDidMount() {
    const Cart = AsyncStorage.getItem('Cart').then(cart => {
      if (cart !== null) {
        let items = JSON.parse(cart);
        this.setState({cart: items});

        let price = 0;
        if (this.state.cart.length > 0) {
          this.state.cart.forEach(prod => {
            price = parseInt(prod.product_price) + price;
          });

          this.setState({totalPrice: price});
        }
        console.log(items);
      }
    });
  }

  render() {
    const swipeSetting = {
      autoClose: true,
      onClose: (secID, rowID, direction) => {
        if (this.state.activeRowKey != null) {
          this.setState({activeRowKey: null});
        }
      },
      onOpen: (secID, rowID, direction) => {
        this.setState({activeRowKey: this.props.item.productid});
      },
      right: [
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            const datacart = this.state.Cart;
            Alert.alert(
              'Alert',
              'Are you sure you want to delete ?',
              [
                {
                  text: 'No',
                  onPress: () => console.log('Cancel pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    this.props.delete(this.props.index);
                    this.props.parentFlatList.refreshFlatList(deletingRow);
                  },
                },
              ],
              {cancelable: true},
            );
          },
          text: 'Delete',
          type: 'delete',
        },
      ],
      rowID: this.props.index,
    };
    return (
      <Swipeout {...swipeSetting}>
        <View
          //elevation={2}
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            marginHorizontal: 24,
            marginVertical: 8,
            borderRadius: 4,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1,
            },
          }}>
          <Image
            style={{
              width: 108,
              height: 108,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4,
            }}
            source={{uri: this.props.item.image_url}}
          />
          <View
            style={{
              padding: 16,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: '#333',
              }}>
              {this.props.item.product_name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#666',
              }}>
              {this.props.item.product_description}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                //width: "100%"
              }}>
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: 'bold',
                  color: '#ef6136',
                }}>
                {this.props.item.product_price}
              </Text>
              {/* <Button
                          onPress={e => alert("Hey")}
                          title="ADD"
                          style={{
                          backgroundColor: "4099ff",
                          color: "#fff",
                          paddingLeft: 16,
                          paddingRight: 16,
                          paddingTop: 8,
                          paddingBottom: 8
                          }}
                      /> */}
            </View>
          </View>
        </View>
      </Swipeout>
    );
  }
}

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      deleteRowKey: null,
      totalPrice: 0,
    };
    this.useEffect = React.useEffect;
  }

  componentDidMount() {
    const Cart = AsyncStorage.getItem('Cart').then(cart => {
      if (cart !== null) {
        let items = JSON.parse(cart);
        this.setState({cart: items});

        let price = 0;
        if (this.state.cart.length > 0) {
          this.state.cart.forEach(prod => {
            price = parseInt(prod.product_price) + price;
          });

          this.setState({totalPrice: price});
        }
        console.log(items);
      }
    });
    let price = 0;
    if (this.state.cart.length > 0) {
      this.state.cart.forEach(prod => {
        price = parseInt(prod.product_price) + price;
      });

      this.setState({totalPrice: price});
    }
  }
  onChangeQual(i, type) {
    const dataCar = this.state.cart;
    let cantd = dataCar[i].quantity;

    if (type) {
      cantd = cantd + 1;
      dataCar[i].quantity = cantd;
      this.setState({cart: dataCar});
    } else if (type == false && cantd >= 2) {
      cantd = cantd - 1;
      dataCar[i].quantity = cantd;
      this.setState({cart: dataCar});
    } else if (type == false && cantd == 1) {
      dataCar.splice(i, 1);
      this.setState({cart: dataCar});
    }
  }

  onDelete = index => {
    this.state.cart.splice(index, 1);
    this.setState({cart: [...this.state.cart]});
    AsyncStorage.setItem('Cart', JSON.stringify(this.state.cart));
    let price = 0;
    if (this.state.cart.length > 0) {
      this.state.cart.forEach(prod => {
        price = parseInt(prod.product_price) + price;
      });

      this.setState({totalPrice: price});
    }
  };

  refreshFlatList = deletedKey => {
    this.setState(prevState => {
      return {
        deleteRowKey: deletedKey,
      };
    });
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{height: 20}} />
        <Text style={{fontSize: 32, fontWeight: 'bold', color: 'black'}}>
          Cart food
        </Text>
        <View style={{height: 10}} />

        <View style={{flex: 1}}>
          <ScrollView style={styles.container}>
            {this.state.cart.length > 0 && (
              <View>
                <FlatList
                  data={this.state.cart}
                  keyExtractor={item => item.productid}
                  renderItem={({item, index}) => (
                    <CartListItem
                      item={item}
                      index={index}
                      parentFlatList={this}
                      delete={this.onDelete}
                    />
                  )}
                />
                <Text style={{fontSize: 20, margin: 20}}>
                  Total Price : Rs {this.state.totalPrice}
                </Text>
                <FlatButton text="Purchase" onPress={() => {}} />
              </View>
            )}
          </ScrollView>
        </View>
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
});
