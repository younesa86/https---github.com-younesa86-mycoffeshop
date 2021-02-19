import React, {Component} from 'react'
import {Text, View, StatusBar, Dimensions , StyleSheet, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const {width,height} = Dimensions.get('screen')
class HomeScreen extends Component {


  componentDidMount() {

  }


  //logout function
  cleardata = async () => {
    let token = await AsyncStorage.getItem('@session_token')

    return fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
      method: 'post',
      headers: {'x-authorization': token},
    }).then(async response => {
      if (response.status === 200) {
        await AsyncStorage.clear()
        this.props.navigation.navigate('LoginScreen')
      } else if (response === 401) {
        throw 'Unauthorised'
      } else {
        throw 'Somthing went wrong'
      }
    })
  }


  renderhistory =(index) => {
    return <ShopComponent {...index.item} data= {data} />
  }

  render () {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Wellcome to my Coffida</Text>

        <View style={styles.formItem}>
          <TouchableOpacity
            style={styles.formTouch}
            onPress={() => this.cleardata()}>
            <Text style={styles.formTouchText}>logout</Text>
          </TouchableOpacity>

          <View style={styles.formItem}>
            <TouchableOpacity
              style={styles.formTouch}
              onPress={() => this.props.navigation.navigate('UserScreen')}>
              <Text style={styles.formTouchText}>UserInfo</Text>
            </TouchableOpacity>
            
          </View>
          <View style={styles.formItem}>
            <TouchableOpacity
              style={styles.formTouch}
              onPress={() => this.props.navigation.navigate('ShopList')}>
              <Text style={styles.formTouchText}>shops</Text>
            </TouchableOpacity>
            
          </View>

          <View style={styles.formItem}>
            <TouchableOpacity
              style={styles.formTouch}
              onPress={() => this.props.navigation.navigate('UserFavourite')}>
              <Text style={styles.formTouchText}>User Favourite</Text>
            </TouchableOpacity>
            
          </View>

        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  formItem: {
    padding: 20,
  },

  formTouch: {
    backgroundColor: 'white',
    padding: 10,
    fontSize: 20,
    alignItems: 'center',
  },
})

export default HomeScreen
