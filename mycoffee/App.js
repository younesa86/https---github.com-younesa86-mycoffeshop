import 'react-native-gesture-handler';
import React, { Component } from 'react';
//import start from './Navigation/Navigate';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import UserScreen from './screens/UserScreen';
import ShopList from './screens/ShopList';



const appstart = createStackNavigator();

class App extends React.Component{
  constructor(props){
    super(props);
  }


  

  render(){
    return(

     

      <NavigationContainer>

        <appstart.Navigator initialRouteName="Home">
          <appstart.Screen name={'LoginScreen'} component={LoginScreen} />
          <appstart.Screen name={'SignupScreen'} component={SignupScreen} />
          <appstart.Screen name={'HomeScreen'} component={HomeScreen} />
          <appstart.Screen name={'UserScreen'} component={UserScreen} />
          <appstart.Screen name={'ShopList'} component={ShopList} />


        </appstart.Navigator>
           


      </NavigationContainer>
 
     // <HomeScreen />
    );
  }
}

export default App;
