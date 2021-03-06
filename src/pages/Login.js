/* eslint-disable prettier/prettier */
import React,{Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput, StatusBar,TouchableOpacity } from 'react-native';

import Logo from '../components/Logo'
import Form from '../components/Form'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view"

export default class Login extends Component{
    constructor(props) {
        super(props)
    }

    render() {

        const { navigation } = this.props;
        return(
            <KeyboardAwareScrollView
                style={{flex:1}}
            >
                <View style={styles.container}>
                    <Logo />
                    <Form navigation={this.props.navigation}  type="Login"/>
                    <View style={styles.signupTextCont}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={()=>{
                            navigation.push('Signup')
                        }}>
                        <Text style={styles.signupButton}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
      flexGrow: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center'
  
    },
    signupTextCont:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection:'row'
    },
    signupText:{
        color: '#AA26DA',
        fontSize: 16
    },
    signupButton:{
        color:'#AA26DA',
        fontSize:16,
        fontWeight:'700'
    }
    
});