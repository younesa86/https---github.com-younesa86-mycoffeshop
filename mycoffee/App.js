import 'react-native-gesture-handler';
import React, { Component } from 'react';
import start from './Navigation/Navigate';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';





const appstart = createStackNavigator();

class App extends React.Component{
  constructor(props){
    super(props);
  }


  

  render(){
    return(

     

      <NavigationContainer>

        <appstart.Navigator>
          <appstart.Screen name={'root'} component={start} />
        </appstart.Navigator>
           


      </NavigationContainer>
 
     // <HomeScreen />
    );
  }
}

export default App;
