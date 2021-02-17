import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

class HomeScreen extends Component {


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
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  formItem: {
    padding: 30,
  },

  formTouch: {
    backgroundColor: 'lightblue',
    padding: 10,
    alignItems: 'center',
  },
})

export default HomeScreen
