/* eslint-disable prettier/prettier */
import React,{Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput, StatusBar ,TouchableOpacity} from 'react-native';

import Logo from '../components/Logo'
import Form from '../components/Form'

export default class Signup extends Component{
    constructor(props) {
        super(props)
    }

    render() {

        const { navigation } = this.props;
        return(
            <View style={styles.container}>
                <Logo />
                <Form   navigation={this.props.navigation} type="Sign Up"/>
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Alreadt have an account? </Text>
                    <TouchableOpacity onPress={()=>{
                        navigation.push('Login')
                    }}>
                    <Text style={styles.signupButton}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
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