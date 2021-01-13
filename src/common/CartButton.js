import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';

const CartButton = props => {
  let bottomNavigator = props.bottomNavigator;

  return (
    <TouchableOpacity
      style={{
        position: 'relative',
        marginRight: 20,
      }}
      onPress={() => {
        bottomNavigator.navigate('Cart');
      }}>
      <Image
        style={{width: 32, height: 32}}
        source={require('../../assets/shopping-bag.png')}
      />
      <View
        style={{
          height: 20,
          width: 20,
          borderRadius: 10,
          backgroundColor: '#ef6136',
          position: 'absolute',
          left: 15,
          top: 13,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 13,
            textAlign: 'center',
            lineHeight: 20,
          }}>
          {props.length}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CartButton;
