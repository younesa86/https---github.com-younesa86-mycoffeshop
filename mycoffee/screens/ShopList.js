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
//import ShopDetailes from './ShopDetailes';

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
            listData: responseJson
        })
       
      })
      .catch((error) => {
        console.log(error);
        
      })

    
    }
  
    


  
  
  

  render() {
    
     
    
    return (
      <View style= {{ flex: 1,  alignItems: 'center',backgroundColor: 'white', fontWeight: 'bold'}} >
       <Text 
      />

      <View style= {{flexDirection: 'row',justifyContent: 'space-between'}}>
        <Text style= {{fontSize: 20, color: 'black',fontWeight: 'bold', marginLeft: 10, padding: 20}} > Coffee Location</Text>
      </View>

      



      <View  >
      
       <FlatList
                nestedScrollEnabled
                style={{fontWeight: 'bold', fontSize:100}}
                data={this.state.listData }
                renderItem={({item}) => (
                    <View>
                      <Text onPress={() => this.props.navigation.navigate('ShopDetailes',{ location: item.location_id})}>{item.location_name} </Text>
                     
                    </View>
                )}
                keyExtractor={(item) => item.location_id.toString()}
                showsVerticalScrollIndicator
              />

        
      </View>
      </View>
    )}
    
}   
export default ShopList;
