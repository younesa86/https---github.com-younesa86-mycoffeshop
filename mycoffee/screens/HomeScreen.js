import React, {Component} from 'react';
import {Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




class HomeScreen extends Component {
    
    
    //logout
    cleardata = async () => {
        let token = await AsyncStorage.getItem('@session_token');

        return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
            method: 'post',
            headers: { 'x-authorization': token                                
            }
            
            })
            .then(async(response) => {
            if(response.status === 200) {
            
                await AsyncStorage.clear();
                this.props.navigation.navigate('LoginScreen')

            }else if(response === 401) {
                throw 'Unauthorised';
            }else{
                throw 'Somthing went wrong';
            }
            })
           
    
    }

    

    render() {
        return (
            <View style= {{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

            }}>
            <Text>Wellcome to my Coffida</Text>
            
            <Button 
                title="logout"
                color="darkblue"
                onPress={() => this.cleardata()}                   
                
            />


            

            </View>
        );
    }


}

export default HomeScreen;
