import React, { Component } from 'react';
import {
    FlatList,
  ScrollView,
  ToastAndroid,
  StyleSheet, Text,
  TextInput,
  TouchableOpacity, View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


class UpdateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isloading: true,
      listData: []

    }
  }

  componentDidMount() {
      this.getData()

  }


  

  //get all coffee locations
  getData = async () => {
      
    const token = await AsyncStorage.getItem('@session_token')
    return fetch("http://10.0.2.2:3333/api/1.0.0/find",  {
        method: 'get',
        headers: {'x-authorization': token
        } 
      
    })
    .then((response) => {
        if(response.status === 200) {
            return response.json()
        }else {
            throw 'Something went wrong';
        }
    })
    .then( (responseJson) => {
        this.setState({
            isloading: false,
            listData: responseJson
        })
       
      })
      .catch((error) => {
        console.log(error);
        ToastAndroid.show(error, ToastAndroid.SHORT);
      })

    
    }


  
  
  

  render() {
     
    
    return (
      
      <View>
       <FlatList
                data={this.state.listData}
                renderItem={({item}) => (
                    <View>
                      <Text>{item.location_name}</Text>
                     
                    </View>
                )}
                keyExtractor={(item,index) => item.location_id.toString()}
              />

      </View>
    )}
    
}   
export default UpdateUser;
