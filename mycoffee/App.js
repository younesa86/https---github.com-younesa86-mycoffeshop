import 'react-native-gesture-handler';
import React, { Component } from 'react';


import Sign_Up from '../mycoffee/screens/signup';


class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
 
     // <HomeScreen />
      <Sign_Up/>
    );
  }
}

export default App;
