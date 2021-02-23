import React, {Component} from 'react'
import {
  StyleSheet,
  TextInput,
  
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  ToastAndroid,
  FlatList,
} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
//import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import StarRating from 'react-native-star-rating';

import {Rating, AirbnbRating} from 'react-native-ratings';

import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('screen')

class Search extends Component {
  constructor (props) {
    super(props)

    this.state = {
      details: {},
      overall_rating: 0,
      price_rating: 0,
      quality_rating: 0,
      clenliness_rating: 0,
      q:'',
     
      
    };
  }

  componentDidMount () {
    this.getLocation();
   
  };
 
  // get the location info
  getLocation = async () => {
   
    
    let token = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/find' , {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'x-authorization': token,
      },
    })
      .then(response => {
        if (response.status === 200) {
            console.log("i am in")
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


  // search function
  Search =() => {
      let url = "http://10.0.2.2:3333/api/1.0.0/find?"
      console.log(" i am here"+this.state.q)
      
      if (this.state.q != '') {
          url += "q" + this.state.q + "&";
      }
       if (this.state.overall_rating >0) {
           url += "overall_rating" + this.state.overall_rating + "&"
       }
       this.getLocation();
  }
 
    
    


  //rating function
 ratingCompleted = (rating, type) => {
   if (type === 1) this.setState ({overallRating: rating})
   else if (type === 2) this.setState({priceRating:rating})
   else if (type === 3) this.setState({qualityRating: rating})
   else if (type === 4) this.setState({clenlinessRating:rating})
 }
 
  
  render () {
    const {details} = this.state
    return (
      <View style={{flex: 1, backgroundColor: 'black',}}>
      <View style={{flexDirection:'row'}}>
      <Text style={[styles.input,  ]}>Search: </Text>
     
      </View>

        <View style={{flexDirection: 'row', marginTop: 5}}>
        <View>
          <TextInput
                placeholder='Enter your search...'
                style={styles.formInput}
                onChangeText={(q) => this.setState({q: q})}
                value={this.state.q}
              />
       
       </View>
        </View>
        



                <View style={{flexDirection: 'row',}}>
                <Text style={[styles.input, {width: 130, marginLeft: 10}]}>Overall</Text>
                <Text style={[styles.input, {width: 130, marginLeft: -30}]}>Price </Text>
                <Text style={[styles.input, {width: 130, marginLeft: -35}]}>Quality</Text>
                <Text style={[styles.input, {width: 130, marginLeft: -35}]}>Clenliness </Text>
                </View>

                
                

                <View style={{flexDirection: 'row', marginTop: 5,marginLeft: 10}}>
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



                <View style={{flexDirection: 'row',marginLeft: 130,padding:20}}>
              
                <TouchableOpacity 
              
             
             
              onPress={ this.Search}
            ><Text style={{fontSize: 20, fontWeight: 'bold',
            color:'white', padding: 10}}>Search</Text>

            </TouchableOpacity>

              </View>
                <View style= {{width, height: width + 200,  backgroundColor: 'white',  borderRadius: 30,padding:20}}>

                <FlatList
                nestedScrollEnabled
                    data= {details}
                    renderItem= {({item}) => (
                         <View style= {{flexDirection: 'row', width: '65%',padding:20}}>

                   
                             <View style={{marginLeft:10}}>
                     
                         

                     
                           <Text style= {[styles.input1]}>ID:   {item.location_id }</Text>
                           <Text style= {[styles.input1]}>Name:   {item.location_name }</Text>
                          <Text style= {[styles.input1]}>Overall Rating:  {Math.round(item.avg_overall_rating*10)/10 }</Text>
                          <Text style= {[styles.input1]}>Price Rating:   {Math.round(item.avg_price_rating *10)/10}</Text>
                          <Text style= {[styles.input1]}>Quality Rating:  {Math.round(item.avg_quality_rating *10)/10}</Text>
                          <Text style= {[styles.input1]}>Clenliness Rating:  {Math.round(item.avg_clenliness_rating *10)/10}</Text>
                   
                       </View>
                       


                    </View>
                        
                    )}

                    keyExtractor={(item) => item.location_id.toString()}
                showsVerticalScrollIndicator
                />



              </View>
       
     
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
  input1: {
    fontSize: 20,
    color: 'black',
       marginTop: 10,
  },

  input: {
    fontSize: 20,
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
export default Search;
