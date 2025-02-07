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
import userinfo from './screens/UserInfo';
import  Search from './screens/Search';
import Camera from './screens/Camera';
import EditReviews from './screens/editReview';


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
          <stack.Screen name="HomeScreen" component={HomeScreen} options={{title:"Home", headerShown:false}}/>
          <stack.Screen name="UserScreen" component={UserScreen} options={{title:"Home"}}/>
          <stack.Screen name="ShopList" component={ShopList} options={{title:"Home"}}/>
          <stack.Screen name="UserFavourite" component={UserFavourite} options={{title:"Home"}}/>
          <stack.Screen name="ShopDetailes" component={ShopDetailes} />
          <stack.Screen name="userinfo" component={userinfo} />
          <stack.Screen name="Search" component={Search} />
          <stack.Screen name="Camera" component={Camera} />
          <stack.Screen name="EditReviews" component={EditReviews} />


        </stack.Navigator>
           


      </NavigationContainer>
 
     // <HomeScreen />
    );
  }
}

export default App;
