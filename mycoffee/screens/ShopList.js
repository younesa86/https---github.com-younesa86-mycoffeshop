import React, { Component } from 'react';
import {
    FlatList,
  ScrollView,
  ToastAndroid,
  StyleSheet, Text,
  Dimensions,
  TouchableOpacity, View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('screen')


class ShopList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
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
        //method: 'get',
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
      <View style= {{ flex: 1, backgroundColor: 'black', alignItems: 'center' }} >

      <View style= {{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style= {{fontSize: 20, color: 'white', marginLeft: 10, padding: 20}} > Coffee Location</Text>
      </View>

      <View style= {{width: width- 40, marginBottom: 30, backgroundColor: 'white', padding: 30, borderRadius: 10}}>

      
      
       <FlatList
                data={this.state.listData || []}
                renderItem={({item}) => (
                    <View>
                      <Text>{item.location_name}</Text>
                     
                    </View>
                )}
                keyExtractor={(item,index) => item.location_id.toString()}
              />

       </View>

      </View>
    )}
    
}   
export default ShopList;
