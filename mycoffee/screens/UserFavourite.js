import React, { Component } from 'react';
import {
  StyleSheet,
  ToastAndroid,
  Dimensions, Text,
  FlatList,
  TouchableOpacity,
  Image, View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('screen')

class UserFavourite extends Component {
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
     //   this.setState({data: responseJson})
        
      
      })
      .catch((error) => {
        console.log(error);
        
      })

    
  }

  editreview = async (rev_id) => {
    const {reviewbody, overallRating,priceRating,qualityRating,clenlinessRating} =this.state
    let loc_id = this.props.route.params.location
    this.state.location_id = loc_id
    let send ={
      'overall_rating':overallRating,
      'price_rating':priceRating,
      'quality_rating':qualityRating,
      'clenliness_rating':clenlinessRating,
      'review_body':reviewbody

    }
    
    

     if (!reviewbody && !reviewbody && !priceRating && !qualityRating && !clenlinessRating)
     ToastAndroid.show('please review', ToastAndroid.SHORT)
     if (this.checkword(reviewbody)){
    let token = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review/'+ rev_id, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'x-authorization': token,
      },
      body: JSON.stringify(send),
    })
      .then(response => {
        if (response.status === 200) {

        
        } else {
        }
      })
      .then(async responseJson => {


        this.getinfo()
        
      })
      .catch(error => {
        console.log(error)
      })
     }else {
       ToastAndroid.show('Sorry, review can not have a tea or cake or pastries',ToastAndroid.SHORT)
     }
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
                
                data={userData.reviews}
                renderItem={({item}) => (
                    <View>
                    <View style= {{flexDirection: 'row',marginTop:10}}/>  
                
                <Text style={ styles.textinfo}>
                  { item.location.location_name }  {item.location.location_id}   {item.location.location_town}</Text>
                
                    
                  <Image source = {{uri: item.location.photo_path}}
                      style = {{width, height: height*0.2}}/> 
                      
                      <Text style= { styles.textinfo}>OverallRating: {Math.round(item.review.overall_rating*10)/10 }</Text>
                      <Text style= { styles.textinfo}> Price Rating:  {Math.round(item.review.price_rating *10)/10}</Text>
                      <Text style= { styles.textinfo}>Quality Rating:  {Math.round(item.review.quality_rating *10)/10 }</Text>
                      <Text style= { styles.textinfo}>Clenliness Rating:  {Math.round(item.review.clenliness_rating *10)/10 }</Text>
                      <Text style= { styles.textinfo}>Review:  {item.review.review_body }</Text>
                      <Text style= { styles.textinfo}>Likes:  {item.review.likes }</Text>
                      <TouchableOpacity 
                        style= { styles.formInput}
                      onPress={ ()=> this.props.navigation.navigate('EditReviews',{location_id: item.location.location_id, review_id: item.review.review_id})}
                      >
                      <Text>Edit Review</Text>

                      </TouchableOpacity>
                     
                  

                     
                      
                    </View>
                )}
                keyExtractor={(item,index) => item.review.review_id.toString()} 
              />

             


      

       </View>

      </View>
    )}
  


}

const styles = StyleSheet.create( {
  textinfo : {
     fontSize: 20, color: 'black', padding:2
    
  },
  formInput: {
    
    borderWidth: 2,
    borderStartWidth: 50,
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius: 20,
    borderTopColor:'black',
    borderBottomColor: 'black',
    borderEndColor:'black',
    borderRightColor:'black',
    borderLeftColor:'black',
    color:'white',
    //backgroundColor:'white',
    width: 300
  }


})

export default UserFavourite;





