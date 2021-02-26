import React, { Component } from 'react';
import {
  StyleSheet,
  ToastAndroid,
  Dimensions, Text,
  TextInput,
  TouchableOpacity, View
} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';


import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('screen')
const filte_words =['tea', 'cake', 'pastries']

class EditReviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
     
      userData: {},
      location_id: this.props.route.params.location_id,
      review_id: this.props.route.params.review_id,
      'overall_rating':'',
      'price_rating':'',
      'quality_rating':'',
      'clenliness_rating':'',
      'review_body':''
    }
  }

  

  //get user infoo
  

  editreview = async () => {
    const {reviewbody, overallRating,priceRating,qualityRating,clenlinessRating} =this.state
    let loc_id = this.state.location_id;
    let rev_id = this.state.review_id;
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
          console.log(' your review is editing')
          ToastAndroid.show(' your review is editing',ToastAndroid.SHORT)

        
        } else {
          console.log('Sorry, that not your review')
        }
      })
      
      .catch(error => {
        console.log(error)
      })
     }else {
       ToastAndroid.show('Sorry, review can not have a tea or cake or pastries',ToastAndroid.SHORT)
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
  

  render() {
     
    
    
    return (
      
      <View style= {{ flex: 1, backgroundColor: 'black', alignItems: 'center',}} >

     

      <View style= {{width: width -30, height: width + 150,  backgroundColor: 'white', padding: 30, borderRadius: 30}}>
        
        <View>
          
          
        </View>

        <Text>location ID:{this.state.location_id}</Text>
        <Text>Review ID:{this.state.review_id}</Text>

        <View style={{flexDirection: 'row',}}>
                <Text style={[styles.input, {width: 130, marginLeft:-20}]}>Overall</Text>
                <Text style={[styles.input, {width: 130, marginLeft: -20}]}>Price </Text>
                <Text style={[styles.input, {width: 130, marginLeft: -50}]}>Quality</Text>
                <Text style={[styles.input, {width: 130, marginLeft: -50}]}>Clenliness </Text>
                </View>


                <View style={{flexDirection: 'row', marginTop: 5,marginLeft: -30}}>
                  <AirbnbRating
                    size={10}
                    defaultRating={0}
                    onFinishRating={rating =>
                      this.ratingCompleted(rating, 1)
                    }
                  />
                  <View style={{marginLeft: 5,}}>
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

                <View style={{flexDirection: 'row',marginLeft: 5,padding:1}}>
              
              <TextInput
                placeholder='Enter your review...'
                style={styles.formInput}
                value={this.state.reviewbody}
                onChangeText={(reviewbody) => this.setState({reviewbody})}
                
              />
                           </View>


                <View style={{flexDirection: 'row',marginLeft: 10,padding:1}}>
              <TouchableOpacity 
               style={styles.formInput}
              onPress={ () =>this.editreview()}>
              <Text style={{fontSize:20,color:'white',backgroundColor:'black',padding:5}}> Edit</Text>
              

              </TouchableOpacity>

              </View>


       </View>

      </View>
    )}
  


}

const styles = StyleSheet.create( {
  
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

export default EditReviews;





