import React, {Component} from 'react';
import {Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




class HomeScreen extends Component {
    
    
    
    
    

    render() {
        return (
            <View style= {{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
            <Text>Wellcome to my Coffida</Text>
            
        


            

            </View>
        );
    }


}

export default HomeScreen;
