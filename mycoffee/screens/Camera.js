import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Camera extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userData: {},
      location_id: this.props.route.params.location_id,
      review_id: this.props.route.params.review_id,
    }
  }
  // componentDidMount () {
  //   this.takereviewphoto()
  // }

  render () {
    return (
      <View style={{flex: 1, width: '100%'}}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          captureAudio={false}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              this.takephoto()
            }}
            style={styles.capture}>
            <Text style={{fontSize: 16}}>CAPTURE</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  takereviewphoto = async () => {

    let loc_id = this.state.location_id
    let rev_id = this.state.review_id
    const options = {quality:0.5 , base64: true}
    const data = await this.camera.takePictureAsync(options)

    console.log(data.uri)
    if (this.camera) {

    let token = await AsyncStorage.getItem('@session_token')

      return fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          loc_id +
          '/review/' +
          rev_id,
        {
          method: 'post',
          headers: {
            'Content-Type': 'image/png',
            'x-authorization': token,
          },
          body: data,
        },
      )
        .then(response =>   {
          if (response.status === 200) {
            console.log('photo added')
          } else {
            throw 'Something went wrong'
          }
        })

        .catch(error => {
          console.log(error)
        })
    }
  }

    takephoto = async() => {
      if(this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options);
        this.takereviewphoto(data)

      }

    }
}

const styles = StyleSheet.create({
  container: {flex: 1, flexDirection: 'column'},
  preview: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})

export default Camera;
