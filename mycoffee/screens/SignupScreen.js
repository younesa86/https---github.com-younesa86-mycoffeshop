import React, { Component } from 'react';
import {
  ScrollView,
  ToastAndroid,
   Text,
  TextInput,
  TouchableOpacity, View
} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';


class SignupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    }
  }

  SignUp = () => {
    return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then((response) => {
      if(response.status === 201){
        return response.json()
      }else if(response.json.status === 400) {
        throw 'Failed validation';
      }else{
        throw 'Somthing went wrong';
      }
    })
    .then(async (responseJson) => {
      ToastAndroid.show("Account Created", ToastAndroid.SHORT);
      this.props.navigation.navigate('LoginScreen')
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
          <Text style={{color: 'steelblue',
                        backgroundColor: 'lightblue',
                        padding: 10,
                        fontSize: 25}}>Create an account</Text>

          <View style={{padding: 20}}>
            <Text style={{fontSize: 15,
                          color: 'steelblue'}}>First Name:</Text>
            <TextInput
              placeholder="Enter first name..."
              style={{ borderWidth: 1,
                        borderColor: 'lightblue',
                        borderRadius: 5}}
              onChangeText={(first_name) => this.setState({first_name})}
              value={this.state.first_name}
            />
          </View>

          <View style={{padding: 20}}>
            <Text style={{fontSize: 15,
                          color: 'steelblue'}}>Last Name:</Text>
            <TextInput
              placeholder="Enter last name..."
              style={{ borderWidth: 1,
                        borderColor: 'lightblue',
                        borderRadius: 5}}
              onChangeText={(last_name) => this.setState({last_name})}
              value={this.state.last_name}
            />
          </View>

          <View style={{padding: 20}}>
            <Text style={{fontSize: 15,
                          color: 'steelblue'}}>Email:</Text>
            <TextInput
              placeholder="Enter an email..."
              style={{ borderWidth: 1,
                        borderColor: 'lightblue',
                        borderRadius: 5}}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
          </View>

          <View style={{padding: 20}}>
            <Text style={{fontSize: 15,
                          color: 'steelblue'}}>Password:</Text>
            <TextInput
              placeholder="Enter password..."
              style={{ borderWidth: 1,
                        borderColor: 'lightblue',
                        borderRadius: 5}}
              secureTextEntry
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
          </View>

          <View style={{padding: 20}}>
            <TouchableOpacity
              style={{ backgroundColor: 'lightblue',
                        padding: 10,
                        alignItems: 'center'}}
              onPress={() => this.SignUp()}>
              <Text style={{fontSize: 20,
                            fontWeight: 'bold',
                            color: 'steelblue'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}



export default SignupScreen;
