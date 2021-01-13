/* eslint-disable prettier/prettier */
import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
var {width} = Dimensions.get('window');
console.disableYellowBox = true;
// import icons
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Cart from '../pages/Cart';
import NewComp from '../../NewComp';
import Food from '../pages/Food';
import Restaurants from '../components/Restaurants';

import StackContainer from '../Containers/StackContainer';
import SearchRestaurant from '../components/SearchRestaurant';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabs = ({stackNavigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="Food"
      tabBarOptions={{
        style: {
          backgroundColor: 'white', //color you want to change
        },
      }}>
      <Tab.Screen
        name="Food"
        component={StackContainer}
        initialParams={{stackNav: stackNavigation}}
        options={{
          tabBarLabel: 'Food',
          tabBarIcon: ({color, size}) => (
            <IonIcons name="ios-cafe" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color, size}) => (
            <IonIcons name="ios-basket" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchRestaurant}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <IonIcons name="ios-search" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export function HomeScreen({navigation}) {
  return <BottomTabs stackNavigation={navigation} />;
}
