/* eslint-disable no-undef */
import React, {Component} from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import {ListItem, SearchBar} from 'react-native-elements';
import FlatButton from '../asset/button';
import RestaurantItem from './RestaurantItem';

class SearchRestaurant extends Component {
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
  handleNaviagation(item) {
    this.props.navigation.navigate('Dishes', {
      res_id: item.res_id,
    });
  }
  componentDidMount() {
    // this.getData();
  }

  getData = async () => {
    const url = 'https://reservo-app.com/reservo/user/search_restuarant';
    this.setState({loading: true});

    let data = new FormData();
    data.append('search', this.state.search);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: data,
      });
      const json = await response.json();
      this.setResult(json);
    } catch (e) {
      this.setState({error: 'Error Loading content', loading: false});
      console.log(e);
    }
  };

  setResult = res => {
    if (res.status !== 'error')
      this.setState({
        data: res,
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
        onChangeText={txt => {
          if (txt === '') {
            this.setState({data: []});
          } else {
            this.setState({search: txt});
            this.getData();
          }
        }}
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
        .map(function({res_id, res_name, res_address, res_phoneno}) {
          return {res_id, res_name, res_address, res_phoneno};
        });
    });
  };

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
        <FlatButton onPress={this.getData} text="Reload" />
      </View>
    ) : (
      <FlatList
        ListHeaderComponent={this.renderHeader}
        data={this.state.data}
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
    );
  }
}

export default SearchRestaurant;
