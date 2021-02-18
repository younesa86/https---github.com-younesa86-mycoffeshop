import React, { Component } from 'react';
import {
  ScrollView,
  ToastAndroid,
   Text,
  TextInput,
  TouchableOpacity, View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
    
       


    }
  }

  componentDidMount() {
      this.getinfo()

  }

  //get user infoo
  getinfo = async () => {
      
    let user_Id= await AsyncStorage.getItem('@user_id');
    let token = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + user_Id, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'x-authorization': token

      }
      
    })
    .then((response) => {
        if(response.status === 200) {
            return response.json()
        }else {
            throw 'Something went wrong';
        }
    })
    .then(async (responseJson) => {
        this.setState({"first_name": responseJson.first_name})
        this.setState({"last_name": responseJson.last_name})
        this.setState({"email": responseJson.email})
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
          <Text style= {{  color: 'steelblue',
                          backgroundColor: 'lightblue',
                          padding: 10,
                          fontSize: 25,}}>User Information</Text>

          <View style={{padding: 20}}>
            <Text style={{fontSize: 15,
                          color: 'steelblue'}}>First Name:</Text>
            <TextInput
             
              style={{borderWidth: 1,
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
             
              style={{borderWidth: 1,
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
             
              style={{borderWidth: 1,
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
             
              style={styles.formInput}
              secureTextEntry
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
          </View>

          <View style={{padding: 20}}>
            <TouchableOpacity
              style={{backgroundColor: 'lightblue',
                      padding: 10,
                      alignItems: 'center'}}
              onPress={ this.editInfo}
              >
              <Text style={{fontSize: 20,
                            fontWeight: 'bold',
                            color: 'steelblue'}}>save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}



export default UpdateUser;
