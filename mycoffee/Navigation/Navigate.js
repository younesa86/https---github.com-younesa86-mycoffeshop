import React, { Component } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//omport {createApp}
//import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login';
import signUp from '../screens/signup';
//import home from '../screens/home';



const stack = createStackNavigator();
//const BottomTab = createBottomTabNavigator();


 function home() {

  return (
    <stack.Navigator >
     <stack.Screen name="login" component={Login} />
     <stack.Screen name="signup" component={signUp} />
    </stack.Navigator> 
  )
}
export default home;





