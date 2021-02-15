import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Navigate from './Navigation/Navigate';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//import HomeScreen from '../mycoffee/screens/home'


//import Sign_Up from '../mycoffee/screens/signup';
const main = createStackNavigator();

class App extends React.Component{
  constructor(props){
    super(props);
  }


  

  render(){
    return(

      <NavigationContainer>

        <main.Navigator>
          <main.Screen name={'root'} component={Navigate} />
        </main.Navigator>
           


      </NavigationContainer>
 
     // <HomeScreen />
    );
  }
}

export default App;
