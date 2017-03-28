import React from 'react'
import { ScrollView, Text, Image, View, AsyncStorage } from 'react-native'
import { Images } from '../Themes'
import Login from './LoginFacebook'
import {Actions} from 'react-native-router-flux'
import styles from './Styles/LaunchScreenStyles'


export default class LaunchScreen extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        this.refreshTitle().done()
    }

    async refreshTitle() {
        var userInfo = await AsyncStorage.getItem(Constants.accessToken)
        console.log(userInfo);
        if(typeof userInfo === 'string') {
            var name = JSON.parse(userInfo).name
            Actions.refresh({'title' : name})
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
