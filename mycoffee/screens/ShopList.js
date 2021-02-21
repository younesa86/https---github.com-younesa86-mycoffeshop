import React, { Component } from 'react';
import {
  FlatList,
  Image,
  StyleSheet, Text,
  Dimensions,
  View
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
      
      <View style= {{ flex: 1,  alignItems: 'center',backgroundColor: 'black'}} >
      

      <View style= {{flexDirection: 'row' ,padding:10}}>
        <Text style= {{fontSize: 20, color: 'white',fontWeight: 'bold', marginLeft: 10, padding: 20}} > Coffee Location</Text>
      </View>


      <View style= {{width: width -30, height: width + 200,  backgroundColor: 'white',  borderRadius: 30,padding:20}}>
     

       <FlatList 
                
                nestedScrollEnabled
                
                data={this.state.listData }
                renderItem={({item}) => (
                    <View style= {{flexDirection: 'row', width: '65%',padding:10}}>

                   
                   <View style={{marginLeft:10}}>
                      <Text style= {{ fontSize: 20,fontWeight: 'bold'}}
                       onPress={() => this.props.navigation.navigate('ShopDetailes',{ location: item.location_id})}>
                         {item.location_town }     {item.location_name} 
                      </Text>
                         

                       <Image
                          source={{uri: item.photo_path}}
                          style={{width, height: 100}}></Image>
                          <Text style= {[styles.input]}>Overall Rating:  {Math.round(item.avg_overall_rating*10)/10 }</Text>
                          <Text style= {[styles.input]}>Price Rating:   {Math.round(item.avg_price_rating *10)/10}</Text>
                          <Text style= {[styles.input]}>Quality Rating:  {Math.round(item.avg_quality_rating *10)/10}</Text>
                          <Text style= {[styles.input]}>Clenliness Rating:  {Math.round(item.avg_clenliness_rating *10)/10}</Text>
                          <Text style= {[styles.input]}>Likes:  {item.likes }</Text>
                   
                       </View>
                       


                    </View>
                )}
                keyExtractor={(item) => item.location_id.toString()}
                showsVerticalScrollIndicator
              />


      </View>
      </View>
    )}
    
}

const styles = StyleSheet.create({
  
  input: {
    fontSize: 15,
     fontWeight: '700'
  },
})

export default ShopList;
