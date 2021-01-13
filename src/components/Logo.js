/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';

export default class Logo extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Image style={{width:200,height: 150}}
            source={require('../images/logo-purple.png')} />
            <Text style={styles.logoText}>Future of Reservation</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center'
  
    },

    logoText: {
        fontSize: 20,
        color: '#AA26DA'
    }
    
});