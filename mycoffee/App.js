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
import UserFavourite from './screens/UserFavourite';
import ShopDetailes from './screens/ShopDetailes';



const stack = createStackNavigator();

class App extends React.Component{
  constructor(props){
    super(props);
  }


  

  render(){
    return(

     

      <NavigationContainer>

        <stack.Navigator >
          <stack.Screen name="LoginScreen" component={LoginScreen} options={{title:"Login"}}/>
          <stack.Screen name="SignupScreen" component={SignupScreen} options={{title:"Login"}} />
          <stack.Screen name="HomeScreen" component={HomeScreen} options={{title:"Home"}}/>
          <stack.Screen name="UserScreen" component={UserScreen} options={{title:"Home"}}/>
          <stack.Screen name="ShopList" component={ShopList} options={{title:"Home"}}/>
          <stack.Screen name="UserFavourite" component={UserFavourite} options={{title:"Home"}}/>
          <stack.Screen name="ShopDetailes" component={ShopDetailes} />


        </stack.Navigator>
           


      </NavigationContainer>
 
     // <HomeScreen />
    );
  }
}

export default App;
