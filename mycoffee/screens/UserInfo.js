import React, { Component } from 'react';
import {
  StyleSheet,
  ToastAndroid,
  Dimensions, Text,
  FlatList,
  Image, View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('screen')

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
      userData: {},
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
      
        this.setState({userData: responseJson})
        this.setState({data: responseJson})
        
      
      })
      .catch((error) => {
        console.log(error);
        
      })

    
  }
  

  render() {
     const {userData} = this.state
     
    
    
    return (
      
      <View style= {{ flex: 1, backgroundColor: 'black', alignItems: 'center',}} >

      <View style= {{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style= {[ styles.textinfo,  {marginLeft: 10, padding: 20}]} > User Profile</Text>
      </View>

      <View style= {{width: width -30, height: width + 150,  backgroundColor: 'white', padding: 30, borderRadius: 30}}>
        
        <View>
          
          <Text style={ styles.textinfo }> Name: {userData.first_name} {userData.last_name}</Text>
          <Text style={ styles.textinfo}> Email: {userData.email}</Text>

        </View>

        
       <FlatList
                
                data={userData.favourite_locations}
                renderItem={({item}) => (
                    <View>
                    <View style= {{flexDirection: 'row',marginTop:10}}/>
                
                <Text style={ styles.textinfo}>
                  { item.location_name }  {item.location_id}   {item.location_town}</Text>
                
                    
                  <Image source = {{uri: item.photo_path}}
                      style = {{width, height: height*0.2}}/> 
                      
                      <Text style= { styles.textinfo}>OverallRating: {Math.round(item.avg_overall_rating *10)/10 }</Text>
                      <Text style= { styles.textinfo}> Price Rating:  {Math.round(item.avg_price_rating *10)/10 }</Text>
                      <Text style= { styles.textinfo}>Quality Rating:  {Math.round(item.avg_quality_rating *10)/10 }</Text>
                      <Text style= { styles.textinfo}>Clenliness Rating:  {Math.round(item.avg_clenliness_rating *10)/10 }</Text>
                      {/* <Text style= { styles.textinfo}>Review:  {item.review.review_body }</Text>
                      <Text style= { styles.textinfo}>Likes:  {item.review.likes }</Text>
                      */}
                  

                     
                      
                    </View>
                )}
                keyExtractor={(item,index) => item.location_id.toString()} 
              />

             


      

       </View>

      </View>
    )}
  


}

const styles = StyleSheet.create( {
  textinfo : {
     fontSize: 20, color: 'black', padding:2
    
  }


})

export default UserInfo;





