import React, {Component} from 'react'
import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  ToastAndroid,
  FlatList,
} from 'react-native';
import * as _ from 'lodash';
//import Icon from 'react-native-vector-icons/FontAwesome';
//import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import images from '../images/Images';
import StarRating from 'react-native-star-rating';

import {Rating, AirbnbRating} from 'react-native-ratings';

import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('screen')
const filte_words =['tea', 'cake', 'pastries']

class ShopDetailes extends Component {
  constructor (props) {
    super(props)

    this.state = {
      details: {},
      overallRating: 0,
      priceRating: 0,
      qualityRating: 0,
      clenlinessRating: 0,
      reviewbody:'',
      photo:'',
      userinfo:{},
      
    };
  }

  componentDidMount () {
    this.getLocation();
    this.getinfo()
  };
 
  // get the location info
  getLocation = async () => {
    let loc_id = this.props.route.params.location
    this.state.location_id = loc_id
    
    let token = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'x-authorization': token,
      },
    })
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else {
          
          throw 'Something went wrong'
        }
      })
      .then(async responseJson => {
        this.setState({details: responseJson})
      })
      .catch(error => {
        console.log(error)
      })
  };

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
     this.setState({userinfo:responseJson}) 
       
      })
      .catch((error) => {
        console.log(error);
        
      })

    
  }

  // like and unlike review
  likereview = async (review_id, islike) => {
    let loc_id = this.props.route.params.location
    this.state.location_id = loc_id
    
    let token = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review'+ review_id+ '/like', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-authorization': token,
      },
    })
      .then(response => {
        if (response.status === 200) {
          //return response.json()
        } else {
          
          throw 'Something went wrong'
        }
      })
      .then(async responseJson => {
        this.setState({details: responseJson})
      })
      .catch(error => {
        console.log(error)
      })    
    
  }

  
  //Add review
  addreview = async () => {
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
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-authorization': token,
      },
      body: JSON.stringify(send),
    })
      .then(response => {
        if (response.status === 201) {
          
        
        } else {
          console.log('bad')
          throw 'Something went wrong'
        }
      })
      .then(async responseJson => {
        console.log('done')
        this.getLocation(loc_id)
        this.getinfo()
        
      })
      .catch(error => {
        console.log(error)
      })
     }else {
       ToastAndroid.show('Sorry, review can not have a tea or cake or pastries',ToastAndroid.SHORT)
     }
  }



  //delete and add favourite location
  addfavourite = async () => {
    const loc_id = this.props.route.params.location
    this.state.location_id = loc_id
    const {details} =this.state
    const{favourite_locations} = this.state.userinfo
   
    
      

    
    let token = await AsyncStorage.getItem('@session_token')
    if (_.findIndex(favourite_locations,location => location.location_id === details.location_id) !== -1) {
      return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/favourite', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'x-authorization': token,
        },
       
      })
        .then(response => {
          if (response.status === 200) {
            
            ToastAndroid.show('deleted from your Favourite', ToastAndroid.show);
           
          } else {
            
            throw 'Something went wrong'
          }
        })
        .then(async responseJson => {
          
          this.getinfo()
        
          
        })
        .catch(error => {
          console.log(error)
        })
  
    }else {
      return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/favourite', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-authorization': token,
      },
     
    })
      .then(response => {
        if (response.status === 200) {
          
          ToastAndroid.show('Added to your Favourite', ToastAndroid.show);
        } else {
          
          throw 'Something went wrong'
        }
      })
      .then(async responseJson => {
        
        this.getinfo()
      
        
      })
      .catch(error => {
        console.log(error)
      })

    }
  
  }

  //filter for bad words
  checkword =(reviewbody) => {
    let check = true;
    filte_words.forEach(word => {
      if (reviewbody.includes(word)) {
        check = false
        return
      }
    })
    return check
  }

  //rating function
 ratingCompleted = (rating, type) => {
   if (type === 1) this.setState ({overallRating: rating})
   else if (type === 2) this.setState({priceRating:rating})
   else if (type === 3) this.setState({qualityRating: rating})
   else if (type === 4) this.setState({clenlinessRating:rating})
 }
  // ratingCompleted (rating, name) {
  //   let Obj = () => {
  //     let rateObj = {}
  //     rateObj[name] = rating
  //     return rateObj
  //   }
  //   this.setState(Obj)
  // };
  
  render () {
    const {details} = this.state
    const{favourite_locations} = this.state.userinfo
    return (
      <View style={{flex: 1, backgroundColor: 'black',}}>
      <View style={{flexDirection:'row'}}>
      <Text style={[styles.input, ]}>Overall:</Text>
      <AirbnbRating
        size={5}
        rating={details.avg_overall_rating }
      />
      </View>

        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text style={{fontSize: 20, color: 'white'}}>
            {details.location_name} ID:{details.location_id} {}{' '}
            {details.location_town}
          </Text>
          <TouchableOpacity
             onPress={ () =>this.addfavourite()}>
              <Text style={{marginLeft: 60, width:60, height:50}} >
              {_.findIndex(favourite_locations,location => location.location_id === details.location_id) !== -1 ?  '💗' : '🤍'}

              </Text>

              
              </TouchableOpacity>
        </View>
        

        <Image  
          source={{uri: details.photo_path}}
          style={{width, height: 120}}></Image>



          {/* <View style={{width, height: 120}} >
          
          <MapView 
          style={{...StyleSheet.absoluteFill}}
          initialRegion = {{
            latitude:details.latitude,
            longitude:details.longitude,
            latitudeDelta:0.002,
            longitudeDelta:0.002,
            
          }}
          >
          <Marker
            coordinate={{
              latitude:details.latitude,
              longitude: details.longitude,
              
            }}
            title={'cpffe'}
            descriptio={'cafe'}
          />

          </MapView> 
          

          </View>
       */}

                <View style={{flexDirection: 'row',}}>
                <Text style={[styles.input, {width: 130, marginLeft: 25}]}>Overall</Text>
                <Text style={[styles.input, {width: 130, marginLeft: -20}]}>Price </Text>
                <Text style={[styles.input, {width: 130, marginLeft: -30}]}>Quality</Text>
                <Text style={[styles.input, {width: 130, marginLeft: -55}]}>Clenliness </Text>
                </View>

                
                

                <View style={{flexDirection: 'row', marginTop: 5,marginLeft: 20}}>
                  <AirbnbRating
                    size={10}
                    defaultRating={0}
                    onFinishRating={rating =>
                      this.ratingCompleted(rating, 1)
                    }
                  />
                  <View style={{marginLeft: 15,}}>
                  <AirbnbRating
                    size={10}
                    defaultRating={0}
                    onFinishRating={rating =>
                      this.ratingCompleted(rating, 2)
                    }
                  />
                  </View>
                  <View style={{marginLeft: 15}}>
                  <AirbnbRating
                    size={10}
                    defaultRating={0}
                    onFinishRating={rating =>
                      this.ratingCompleted(rating,3)
                    }
                  />
                  </View>
                  <View style={{marginLeft: 15}}>
                  <AirbnbRating
                    size={10}
                    defaultRating={0}
                    onFinishRating={rating =>
                      this.ratingCompleted(rating, 4)
                    }
                  />
                  </View>
                  
                  
                </View>



                <View style={{flexDirection: 'row',marginLeft: 10,padding:1}}>
              
              <TextInput
                placeholder='Enter your review...'
                style={styles.formInput}
                value={this.state.reviewbody}
                onChangeText={(reviewbody) => this.setState({reviewbody})}
                
              />
             

              <TouchableOpacity 
              onPress={ () =>this.addreview()}>
              <Image style={{marginLeft: 5, width:60, height:50}} source={images.commet}/>
              

              </TouchableOpacity>
              </View>
              <FlatList 
                
                nestedScrollEnabled
               // style={{maxHeight: 75*5}}
                data={details.location_reviews}
                renderItem={({item}) => (
                
                  

                  <View style={{width: width,padding:5,justifyContent:'space-between',marginTop:10, borderRadius:10,backgroundColor:'gray'}}>
                   <View style={{flexDirection: 'row',}}>
                    <Text style={[styles.input, {width: 130, marginLeft: 20}]}>Overall</Text>
                <Text style={[styles.input, {width: 130, marginLeft: -50}]}>Price </Text>
                <Text style={[styles.input, {width: 130, marginLeft: -70}]}>Quality</Text>
                <Text style={[styles.input, {width: 130, marginLeft: -50}]}>Clenliness </Text>
                </View>

                <View style={{flexDirection: 'row',}}>
                    <Text style={[styles.input, {width: 130, marginLeft:30}]}>{item.overall_rating}</Text>
                <Text style={[styles.input, {width: 130, marginLeft: -40}]}>{item.price_rating}</Text>
                <Text style={[styles.input, {width: 130, marginLeft: -70}]}>{item.quality_rating}</Text>
                <Text style={[styles.input, {width: 130, marginLeft: -50}]}>{item.clenliness_rating}</Text>

                </View>
                
                <View style={{flexDirection: 'row',}}>
                  
                <Text style={[styles.input, {width, marginLeft: 20}]} numberOfLines={1}>{item.review_body}</Text>
                
                </View>

                <View style={{flexDirection: 'row',}}>
                  
                  <Text style={[styles.input, {width, marginLeft: 20}]} numberOfLines={1}>Likes: {item.likes}</Text>
                  

                    

                  </View>
  
                 

                 


                  </View>
                

                
                       


                   
                )}
                keyExtractor={(item) => item.review_id.toString()}
                showsVerticalScrollIndicator
              />
       
     
      </View>
    )
  }
};



const styles = StyleSheet.create({
  info: {
    width: width - 40,
    justifyContent: 'space-between',
    paddingVertical: 0,
    marginTop: -20,
  },
 

  input: {
    fontSize: 15,
    color: 'white',
    letterSpacing:1,
       marginTop: 10,
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
    color:'black',
    backgroundColor:'white',
    width: 300
  },
  
})
export default ShopDetailes
