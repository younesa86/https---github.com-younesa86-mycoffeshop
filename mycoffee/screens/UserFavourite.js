import React, { Component } from 'react';
import {
  ScrollView,
  ToastAndroid,
  Dimensions, Text,
  FlatList,
  Image, View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get('screen')

class UserFavourite extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      user_id: "",
      favourite_locations: [],

      reviews: [],
      liked_reviews: [],
      

       


    }
  }

  componentDidMount() {
      this.getinfo()

  }

  //get user infoo
  getinfo = async () => {
      
    let user_Id= await AsyncStorage.getItem('@user_id');
    let token = await AsyncStorage.getItem('@session_token');
    console.log(user_Id);
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
            console.log('success');
        }else {
            throw 'Something went wrong';
        }
    })
    .then(async (responseJson) => {
        this.setState({"user_id": responseJson.user_id})
        this.setState({"First Name": responseJson.first_name})
        this.setState({"last_name": responseJson.last_name})
        this.setState({"email": responseJson.email})
        this.setState({"favourite_locations": responseJson.favourite_locations})
        this.setState({"reviews": responseJson.reviews})
        this.setState({"liked_reviews": responseJson.liked_reviews})
        
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
        <Text style= {{fontSize: 20, color: 'white',  marginLeft: 10, padding: 20}} > User Favourite</Text>
      </View>

      <View style= {{width: width -30, height: width + 150,  backgroundColor: 'white', padding: 30, borderRadius: 30}}>
        
        <View>
          <Text>'User_ID:'{this.state.user_id}</Text>
          <Text> {this.state.first_name}</Text>
        </View>
      
       <FlatList
                data={this.state.favourite_locations}
                renderItem={({item}) => (
                    <View>
                    
                      

                      <Text style= {{fontSize: 20}}>{item.location_id + ",  "+ item.location_name
                      +", " + item.location_town }</Text>

                      <Text style= {{fontSize: 20}}>{item.avg_overall_rating + ",   " + item.avg_price_rating}</Text>
                      <Image style = {{width:50, height:50}} source = {item.photo_path ?{uri:item.photo_path}
                      :null}/>

                    </View>
                )}
                keyExtractor={(item,index) => item.location_id.toString()}
              />



      

       </View>

      </View>
    )}
  


}



export default UserFavourite;





