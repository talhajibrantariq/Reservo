/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';

class SearchProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      temp: [],
      error: null,
      searchTxt: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const url = 'https://reservo-app.com/reservo/user/search_restuarant';
    this.setState({loading: true});

    try {
      const response = await fetch(url);
      const json = await response.json();
      this.setResult(json);
    } catch (e) {
      this.setState({error: 'Error Loading content', loading: false});
    }
  };

  setResult = res => {
    this.setState({
      data: [...this.state.data, ...res],
      temp: [...this.state.temp, ...res],
      error: res.error || null,
      loading: false,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search Here..."
        lightTheme
        round
        editable={true}
        value={this.state.search}
        onChangeText={this.updateSearch}
      />
    );
  };

  updateSearch = searchTxt => {
    this.setState({searchTxt}, () => {
      if (searchTxt == '') {
        this.setState({
          data: [...this.state.temp],
        });
        return;
      }

      this.state.data = this.state.temp
        .filter(function(item) {
          return item.name.includes(search);
        })
        .map(function({productid, product_name, product_price, image_url}) {
          return {productid, product_name, product_price, image_url};
        });
    });
  };

  async handleNaviagation(item) {
    console.log(item);

    const value = AsyncStorage.getItem('isLoggedIn').then(val => {
      if (val !== null) {
        const Cart = AsyncStorage.getItem('Cart').then(cart => {
          if (cart !== null) {
            let items = JSON.parse(cart);
            items.push(item);
            this.setState({no_cartItem: items.length});
            // eslint-disable-next-line no-undef
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
    return this.state.error != null ? (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{this.state.error}</Text>
        <Button
          onPress={() => {
            this.getData();
          }}
          title="Reload"
        />
      </View>
    ) : (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        data={this.state.data}
        keyExtractor={item => item.productid}
        renderItem={({item}) => (
          <ListItem
            name={item.product_name}
            image={item.image_url}
            price={'Rs' + item.product_price}
            handleNavigation={() => this.handleNaviagation(item)}
          />
        )}
      />
    );
  }
}

export default SearchProduct;
