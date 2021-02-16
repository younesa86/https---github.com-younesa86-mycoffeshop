import React, {Component} from 'react';
import {Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';




class HomeScreen extends Component {
    componentDidMount() {
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.checkLoggedIn();

        });
    }

    componentWillUnmount() {
        //this.unsubscribe();
        this.checkLoggedIn;
    }

    checkLoggedIn = async () => {

        const value = await AsyncStorage.getItem('@session_token');
        if (value == null) {
            this.props.navigation.navigate('LoginScreen');
        }
    };

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
