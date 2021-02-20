import React, { Component } from 'react';
import {
  StyleSheet,
  Icon,
  Image,
   Text,
  Dimensions, View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const {width, height} = Dimensions.get('screen')




class ShopDetailes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // location_id: '',
      // location_name: '',
      // location_town: '',
      // latitude: '',
      // longitude: '',
      // photo_path: '',
      // avg_overall_rating: '',
      // avg_price_rating: '',
      // avg_quality_rating: '',
      // avg_clenliness_rating: '',
      // location_reviews: [],
      details: {}

    }

    
  }

  componentDidMount() {
      
      this.getLocation();
  }

  getLocation = async () => {
    
   let loc_id = this.props.route.params.location;
   this.state.location_id = loc_id;
   console.log(loc_id);
    let token = await AsyncStorage.getItem('@session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+ loc_id , {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'x-authorization': token

      }
      
      
    })
    .then((response) => {
        if(response.status === 200) {
          
          console.log('success');
            return response.json();
           
        }else {
console.log('bad');
            throw 'Something went wrong';
        }
    })
    .then(async (responseJson) => {
      this.setState({details: responseJson})
      
       
      })
      .catch((error) => {
        console.log(error);
       
      })

    
   
   
  }

  render(){
    const {details} = this.state
    return(

      <View style= {{ flex: 1, backgroundColor: 'black', alignItems: 'center' }} >

              <View style= {{flexDirection: 'row', justifyContent: 'space-between'}}>
                
              

              
              
              <Text style={{ fontSize: 20, color: 'white',  }}>
                { details.location_name }</Text>
              </View>
              
              <View style ={{height:10, width:10}}></View>

              <Image source = {{uri: details.photo_path}}
                      style = {{width, height: height*0.2}}>

              </Image>

              <View style ={[styles.info, {flexDirection: 'row'}]}>
              <View>
              <View style= {{ flexDirection: 'row', alignItems: 'center', padding:0, marginHorizontal: 30}}>

              <Text style ={[styles.input, {width:130}]} numberOfLines= {1}>Clenliness Rating</Text>
              <View style ={{flexDirection: 'row'}}>
              <Text style ={[styles.input ]}>{Math.round(details.avg_price_rating *10) /10}</Text>
              {/* <Icon
                name= 'star'
                size= '15'
                color= 'yellow'
              /> */}

              

              </View>

              </View>

              </View>

              </View>


              
      </View>
    )
  }

  

  
  
    
}  




const styles = StyleSheet.create({
  info: {
    width: width-40, justifyContent: 'space-between',
    marginTop:20, paddingVertical: 10, backgroundColor:'white',
    borderRadius:10
  },

  input: {
    fontSize: 15, color: 'white', backgroundColor: 'black',
    marginLeft:4, letterSpacing:0.3

  }
})
export default ShopDetailes;
