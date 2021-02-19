import React, {Component} from 'react'
import {
  
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  View,
  ImageBackground,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import images from '../images/Images'

const {width, height} = Dimensions.get('screen')
class LoginScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: 'test1@gmail.com',
      password: '123123',
    }
  }

  //logain function
  login = () => {
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else if (response.json.status === 400) {
          throw 'Invalid Email or Password'
        } else {
          throw 'Somthing went wrong'
        }
      })
      .then(async responseJson => {
        console.log('login successful ', responseJson)
        ToastAndroid.show('Account Created', ToastAndroid.SHORT)
        await AsyncStorage.setItem('@session_token', responseJson.token)
        await AsyncStorage.setItem('@user_id', JSON.stringify(responseJson.id))
        this.props.navigation.navigate('HomeScreen')
      })
      .catch(error => {
        console.log(error)
        ToastAndroid.show(error, ToastAndroid.SHORT)
      })
  }

  render () {
    return (
      
      <View style={{alignItems: 'center', flex: 1, justifyContent: 'flex-end'}}>
        <ImageBackground
                      style={{
                        justifyContent: 'space-between',
                        width,
                        height: height,
                        alignItems: 'center',
                      }}source={images.coffee}>
                <View
                  style={{
                    width: width,
                    height: 350,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 30, color: 'white'}}>
                    My Coffida Project
                  </Text>
                </View>

          <View
            style={{
              width: width,
              height: 300,
             
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              borderBottomStartRadius: 40,
              borderBottomEndRadius: 40,
              alignItems: 'center',
              
            }}>
            <View style={styles.formItem}>
              <Text style={styles.formItem}>Email</Text>
              <TextInput
                placeholder='Enter an email...'
                style={styles.formInput}
                onChangeText={email => this.setState({email})}
                value={this.state.email}
              />
           

            <View style={styles.formItem} />
            <Text style={styles.formLabel}>Password</Text>
            <TextInput
              placeholder='Enter password...'
              style={styles.formInput}
              secureTextEntry
              onChangeText={password => this.setState({password})}
              value={this.state.password}
            />
             </View>

            
          
            <TouchableOpacity 
              
             
             
              onPress={ this.login}
            ><Text style={{fontSize: 20, fontWeight: 'bold',
            color:'white', padding: 10}}>Login</Text>
            </TouchableOpacity>
            
            
            <TouchableOpacity 
              
              onPress={() => this.props.navigation.navigate('SignupScreen')}
            ><Text style={{fontSize: 20, fontWeight: 'bold',
            color:'white',}}>Don't have  an account?</Text>
           
           </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formItem: {
    
    padding: 2,
    fontWeight: 'bold',
    color:'white',
    
    width: 300,
  },
  formLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingHorizontal:2,
    marginTop: 10,
    width: 200,
    color:'white',
  },
  formInput: {
    borderWidth: 2,
    borderStartWidth: 50,
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius: 20,
    borderTopColor:'white',
    borderBottomColor: 'white',
    borderEndColor:'white',
    borderRightColor:'white',
    borderLeftColor:'white',
    color:'white',
  },
 
})

export default LoginScreen
