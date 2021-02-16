import React, { Component } from 'react';
import {
  ScrollView,
  Button,
  ToastAndroid,
  StyleSheet, Text,
  TextInput,
  TouchableOpacity, View, ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {ImageBackground} from 'react-native';
import images from '../images/Images';


class LoginScreen extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
         
          email: '',
          password: '',
        }
    }  


    login = () => {


        return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
        })
        .then((response) => {
        if(response.status === 200) {
            return response.json()
        }else if(response.json.status === 400) {
            throw 'Invalid Email or Password';
        }else{
            throw 'Somthing went wrong';
        }
        })
        .then(async (responseJson) => {
          console.log("login successful ", responseJson);
          ToastAndroid.show("Account Created", ToastAndroid.SHORT);                
          await AsyncStorage.setItem('@session_token', responseJson.token);
          this.props.navigation.navigate("HomeScreen")
          })
          .catch((error) => {
          console.log(error);
          ToastAndroid.show(error, ToastAndroid.SHORT);
        })

    }


    render() {
        return (
        <View>
        
            <ScrollView>
            
            <View style={styles.formItem}>
                <Text style={styles.formLabel}>Email:</Text>
                <TextInput
                placeholder="Enter an email..."
                style={styles.formInput}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                />
            </View>

            <View style={styles.formItem}>
                <Text style={styles.formLabel}>Password:</Text>
                <TextInput
                placeholder="Enter password..."
                style={styles.formInput}
                secureTextEntry
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                />
            </View>

            <View style={styles.formItem}>
            <Button 
                title= "Login"
                onPress={() => this.login()}
            />
            <Button 
                title="Don't have  an account?"
                color="darkblue"
                onPress={() => this.props.navigation.navigate('SignupScreen')}
            />
               
            </View>
            </ScrollView>
        </View>
        );
    }
}  



const styles = StyleSheet.create({
  title: {
    color: 'steelblue',
    backgroundColor: 'lightblue',
    padding: 10,
    fontSize: 25,
  },
  formItem: {
    padding: 20,
  },
  formLabel: {
    fontSize: 15,
    color: 'steelblue',
  },
  formInput: {
    borderWidth: 1,
    borderColor: 'lightblue',
    borderRadius: 5,
  },
  
});

export default LoginScreen;









