import React, { Component } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//omport {createApp}
//import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
//import home from '../screens/home';



const stack = createStackNavigator();
//const BottomTab = createBottomTabNavigator();





function start() {

  return (
    <stack.Navigator >
     <stack.Screen name="LoginScreen" component={LoginScreen} />
     <stack.Screen name="SignupScreen" component={SignupScreen} />
    </stack.Navigator> 
  )
}
export default start;





