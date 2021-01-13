/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';

import StackContainer from './src/Containers/StackContainer.js';
import {HomeScreen} from './src/Screens/HomeScreen';
import Logo from './assets/images/logo-purple.png';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Cart from './src/pages/Cart';
import NewComp from './NewComp';
import Profile from './src/pages/Profile';
import SearchRestaurant from './src/components/SearchRestaurant';
import Food from './src/pages/Food';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// //const BottomTabs = () => {
// /// return (
// //  <Tab.Navigator     initialRouteName="Food">
//     <Tab.Screen name="Food"    component={Food} />
//     <Tab.Screen name="Cart"    component={Cart} />
//     <Tab.Screen name="Profile" component={Profile}  />
//     <Tab.Screen name="Search"  component={SearchRestaurant}/>
//   </Tab.Navigator>
//   );};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
