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
} from 'react-native'
import * as _ from 'lodash'
import images from '../images/Images'
import StarRating from 'react-native-star-rating'

import {Rating, AirbnbRating} from 'react-native-ratings'

import AsyncStorage from '@react-native-async-storage/async-storage'

const {width, height} = Dimensions.get('screen')
const filte_words = ['tea', 'cake', 'pastries']

class ShopDetailes extends Component {
  constructor (props) {
    super(props)

    this.state = {
      details: {},
      overallRating: 0,
      priceRating: 0,
      qualityRating: 0,
      clenlinessRating: 0,
      reviewbody: '',
      photo: '',
      userinfo: {},
      liked_reviews: [],
      myreview: [],
      photo: null,
    }
  }

  componentDidMount () {
    this.getLocation()
    this.getinfo()
  }

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
  }

  //get user infoo
  getinfo = async () => {
    let user_Id = await AsyncStorage.getItem('@user_id')
    let token = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + user_Id, {
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
        this.setState({userinfo: responseJson})
        this.setState({liked_reviews: responseJson.liked_reviews})
        this.setState({myreview: responseJson})
      })
      .catch(error => {
        console.log(error)
      })
  }

  //viewphoto
  viewphoto = async rev_id => {
    let loc_id = this.props.route.params.location
    this.state.location_id = loc_id

    let token = await AsyncStorage.getItem('@session_token')
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
        loc_id +
        '/review/' +
        rev_id +
        '/photo?t=' +
        Date.now(),
      {
        method: 'get',
        headers: {
          'Content-Type': 'image/png',
          'x-authorization': token,
        },
      },
    )
      .then(response => {
        if (response.status === 200) {
          ToastAndroid.show('there is no photo to view', ToastAndroid.show)
        } else {
          // throw 'Something went wrong'
          ToastAndroid.show(
            'Sorry, there is no photo to view ',
            ToastAndroid.show,
          )
        }
      })
      .then(async responseJson => {
        this.setState({photo: {url: responseJson.url}})

        console.log('photo')
      })
      .catch(error => {
        console.log(error)
      })
  }

  // like  review
  likereview = async rev_id => {
    const loc_id = this.props.route.params.location
    this.state.location_id = loc_id

    let token = await AsyncStorage.getItem('@session_token')
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
        loc_id +
        '/review/' +
        rev_id +
        '/like',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'x-authorization': token,
        },
      },
    )
      .then(response => {
        if (response.status === 200) {
          console.log('liked')
          this.getinfo()
          this.getLocation()
          ToastAndroid.show('liked', ToastAndroid.show)
        } else {
          throw 'Something went wrong'
        }
      })

      .catch(error => {
        console.log(error)
      })
  }

  //unlike review
  unlikereview = async rev_id => {
    const loc_id = this.props.route.params.location
    this.state.location_id = loc_id
    let token = await AsyncStorage.getItem('@session_token')
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' +
        loc_id +
        '/review/' +
        rev_id +
        '/like',
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'x-authorization': token,
        },
      },
    )
      .then(response => {
        if (response.status === 200) {
          this.getinfo()
          console.log('unlike')
          this.getLocation() / ToastAndroid.show('unlike', ToastAndroid.show)
        } else {
          throw 'Something went wrong'
        }
      })

      .catch(error => {
        console.log(error)
      })
  }
  //check like review
  chickliked (rev_id) {
    for (let i = 0; i < this.state.liked_reviews.length; i++) {
      if (this.state.liked_reviews[i].review.review_id === rev_id) return true
    }

    return false
  }

  likeDislike (rev_id) {
    if (this.chickliked(rev_id) === true) {
      this.unlikereview(rev_id)
    } else {
      this.likereview(rev_id)
    }
  }

  // delete a review
  deletereview = async rev_id => {
    let loc_id = this.props.route.params.location
    this.state.location_id = loc_id

    let token = await AsyncStorage.getItem('@session_token')
    return fetch(
      'http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review/' + rev_id,
      {
        method: 'delete',
        headers: {
          'x-authorization': token,
        },
      },
    )
      .then(response => {
        if (response.status === 200) {
          ToastAndroid.show('your review was deleted', ToastAndroid.show)
        } else {
          ToastAndroid.show(
            'Sorry, your can not delete another user review ',
            ToastAndroid.show,
          )
        }
      })
      .then(async responseJson => {})
      .catch(error => {
        console.log(error)
      })
  }

  // check review
  checkreview (rev_id) {
    for (let i = 0; i < this.state.myreview.length; i++) {
      if (this.state.myreview.reviews[i].review.review_id == rev_id) {
      }
      return true
    }
    return false
  }
  checkDelete (rev_id) {
    if (this.checkreview(rev_id)) {
      this.deletereview(rev_id)
    }
  }

  //Add review
  addreview = async () => {
    const {
      reviewbody,
      overallRating,
      priceRating,
      qualityRating,
      clenlinessRating,
    } = this.state
    let loc_id = this.props.route.params.location
    this.state.location_id = loc_id
    let send = {
      overall_rating: overallRating,
      price_rating: priceRating,
      quality_rating: qualityRating,
      clenliness_rating: clenlinessRating,
      review_body: reviewbody,
    }

    if (
      !reviewbody &&
      !reviewbody &&
      !priceRating &&
      !qualityRating &&
      !clenlinessRating
    )
      ToastAndroid.show('please review', ToastAndroid.SHORT)
    if (this.checkword(reviewbody)) {
      let token = await AsyncStorage.getItem('@session_token')
      return fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/review',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'x-authorization': token,
          },
          body: JSON.stringify(send),
        },
      )
        .then(response => {
          if (response.status === 201) {
          } else {
            throw 'Something went wrong'
          }
        })
        .then(async responseJson => {
          this.getLocation(loc_id)
          this.getinfo()
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      ToastAndroid.show(
        'Sorry, review can not have a tea or cake or pastries',
        ToastAndroid.SHORT,
      )
    }
  }

  //delete and add favourite location
  addfavourite = async () => {
    const loc_id = this.props.route.params.location
    this.state.location_id = loc_id
    const {details} = this.state
    const {favourite_locations} = this.state.userinfo
    let token = await AsyncStorage.getItem('@session_token')
    if (
      _.findIndex(
        favourite_locations,
        location => location.location_id === details.location_id,
      ) !== -1
    ) {
      return fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/favourite',
        {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
            'x-authorization': token,
          },
        },
      )
        .then(response => {
          if (response.status === 200) {
            ToastAndroid.show('deleted from your Favourite', ToastAndroid.show)
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
    } else {
      return fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' + loc_id + '/favourite',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'x-authorization': token,
          },
        },
      )
        .then(response => {
          if (response.status === 200) {
            ToastAndroid.show('Added to your Favourite', ToastAndroid.show)
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
  checkword = reviewbody => {
    let check = true
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
    if (type === 1) this.setState({overallRating: rating})
    else if (type === 2) this.setState({priceRating: rating})
    else if (type === 3) this.setState({qualityRating: rating})
    else if (type === 4) this.setState({clenlinessRating: rating})
  }

  render () {
    const {favourite_locations} = this.state
    const {details} = this.state
    return (
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.input]}>Overall:</Text>
          <AirbnbRating size={5} rating={details.avg_overall_rating} />
        </View>

        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Text style={{fontSize: 20, color: 'white'}}>
            {details.location_name} ID:{details.location_id} {}{' '}
            {details.location_town}
          </Text>
          <TouchableOpacity onPress={() => this.addfavourite()}>
            <Text style={{marginLeft: 60, width: 60, height: 50}}>
              {_.findIndex(
                favourite_locations,
                location => location.location_id === details.location_id,
              ) !== -1
                ? '💗'
                : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{uri: details.photo_path}}
          style={{width, height: 120}}></Image>

        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.input, {width: 130, marginLeft: 25}]}>
            Overall
          </Text>
          <Text style={[styles.input, {width: 130, marginLeft: -20}]}>
            Price{' '}
          </Text>
          <Text style={[styles.input, {width: 130, marginLeft: -30}]}>
            Quality
          </Text>
          <Text style={[styles.input, {width: 130, marginLeft: -55}]}>
            Clenliness{' '}
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 20}}>
          <AirbnbRating
            size={10}
            defaultRating={0}
            onFinishRating={rating => this.ratingCompleted(rating, 1)}
          />
          <View style={{marginLeft: 15}}>
            <AirbnbRating
              size={10}
              defaultRating={0}
              onFinishRating={rating => this.ratingCompleted(rating, 2)}
            />
          </View>
          <View style={{marginLeft: 15}}>
            <AirbnbRating
              size={10}
              defaultRating={0}
              onFinishRating={rating => this.ratingCompleted(rating, 3)}
            />
          </View>
          <View style={{marginLeft: 15}}>
            <AirbnbRating
              size={10}
              defaultRating={0}
              onFinishRating={rating => this.ratingCompleted(rating, 4)}
            />
          </View>
        </View>

        <View style={{flexDirection: 'row', marginLeft: 10, padding: 1}}>
          <TextInput
            placeholder='Enter your review...'
            style={styles.formInput}
            value={this.state.reviewbody}
            onChangeText={reviewbody => this.setState({reviewbody})}
          />

          <TouchableOpacity onPress={() => this.addreview()}>
            <Image
              style={{marginLeft: 5, width: 30, height: 40}}
              source={images.commet}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Camera', {
                location_id: details.location_id,
                review_id: details.location_reviews.review_id,
              })
            }>
            <Text style={{marginLeft: 20}}>📸</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          nestedScrollEnabled
          style={{maxHeight: 75 * 5}}
          data={details.location_reviews}
          renderItem={({item}) => (
            <View
              style={{
                width: width,
                padding: 5,
                justifyContent: 'space-between',
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: 'gray',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.input, {width: 130, marginLeft: 20}]}>
                  Overall
                </Text>
                <Text style={[styles.input, {width: 130, marginLeft: -50}]}>
                  Price{' '}
                </Text>
                <Text style={[styles.input, {width: 130, marginLeft: -70}]}>
                  Quality
                </Text>
                <Text style={[styles.input, {width: 130, marginLeft: -50}]}>
                  Clenliness{' '}
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.input, {width: 130, marginLeft: 30}]}>
                  {item.overall_rating}
                </Text>
                <Text style={[styles.input, {width: 130, marginLeft: -40}]}>
                  {item.price_rating}
                </Text>
                <Text style={[styles.input, {width: 130, marginLeft: -70}]}>
                  {item.quality_rating}
                </Text>
                <Text style={[styles.input, {width: 130, marginLeft: -50}]}>
                  {item.clenliness_rating}
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[styles.input, {width, marginLeft: 20}]}
                  numberOfLines={1}>
                  {item.review_body}
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[styles.input, {width, marginLeft: 20}]}
                  numberOfLines={1}>
                  Likes: {item.likes}
                </Text>
              </View>
              <TouchableOpacity onPress={() => this.viewphoto()}>
                <Text style={{marginLeft: 300, width: 80, height: 80}}>🖼️</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.likeDislike(item.review_id)}>
                <Text style={{marginLeft: 20, width: 20, height: 20}}>
                  {this.chickliked(item.review_id) ? '💗' : '🤍'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.deletereview(item.review_id)}>
                <Text style={{marginLeft: 20, width: 160}}>
                  {' '}
                  prss X if that your review
                  {this.checkreview(item.review_id) == 'x'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.review_id.toString()}
          showsVerticalScrollIndicator
        />
      </View>
    )
  }
}

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
    letterSpacing: 1,
    marginTop: 10,
  },

  formInput: {
    borderWidth: 2,
    borderStartWidth: 50,
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius: 20,
    borderTopColor: 'black',
    borderBottomColor: 'black',
    borderEndColor: 'black',
    borderRightColor: 'black',
    borderLeftColor: 'black',
    color: 'black',
    backgroundColor: 'white',
    width: 300,
  },
})
export default ShopDetailes
