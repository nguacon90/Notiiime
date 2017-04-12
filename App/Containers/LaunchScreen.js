import React from 'react'
import { ScrollView, Text, Image, View, AsyncStorage } from 'react-native'
import { Images } from '../Themes'
import Login from './LoginFacebook'
import {Actions} from 'react-native-router-flux'
import styles from './Styles/LaunchScreenStyles'
import vndsService from "../Services/VndsService"
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;


export default class LaunchScreen extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        this.refreshTitle().done()
    }

    async refreshTitle() {
        var userInfo = await AsyncStorage.getItem(Constants.accessToken)
        if(typeof userInfo === 'string') {
            var userModel = JSON.parse(userInfo);
            if(userModel.expiredTime >= new Date().getTime()) {
                Actions.refresh({'title' : userModel.name})
                vndsService.clientMQTT("1001", "signal", function(message){
                    alert(message);
                }, function(errMessage){
                    console.log(errMessage)
                }).start();
            } else {
                LoginManager.logOut();
                await AsyncStorage.removeItem(Constants.accessToken);
            }
        }
    }

    render () {
        return (
          <View style={styles.mainContainer}>
            <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
            <ScrollView style={styles.container}>
              <View style={styles.section} >
                <Text style={styles.sectionText} onPress={() => Actions.notiiimeHome()}>
                  {'Go to notiii.me.'}
                </Text>
              </View>
              <View style={styles.centered}>
                <Login />
              </View>
            </ScrollView>
          </View>
        )
    }
}
