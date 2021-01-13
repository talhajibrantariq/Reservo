import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import LoginScreen from '../Screens/LoginScreen';
import HomeScreen from '../Screens/HomeScreen';
import NewComp from '../../NewComp';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import Restaurants from '../components/Restaurants';
import Dishes from '../pages/Dishes';

export default function StackContainer(props) {
  const Stack = createStackNavigator();

  console.log(props.route.params.stackNav);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Restaurants">
      <Stack.Screen
        name="Restaurants"
        component={Restaurants}
        initialParams={{bottomNavigator: props.navigation}}
      />
      <Stack.Screen
        name="Dishes"
        component={Dishes}
        initialParams={{
          bottomNavigator: props.navigation,
          stackNav: props.route.params.stackNav,
        }}
      />
    </Stack.Navigator>
  );
}
