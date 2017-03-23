import React from 'react'
import {Actions} from 'react-native-router-flux'
import { ScrollView, Text, Image, View, AsyncStorage} from 'react-native'
import { Images } from '../Themes'
import styles from './Styles/LaunchScreenStyles'
import Constants from '../Config/Constants'

const FBSDK = require('react-native-fbsdk');
const {
    GraphRequest,
    GraphRequestManager
} = FBSDK;

export default class NotiMeHome extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.refreshTitle().done()
    }

    async refreshTitle() {
        var userInfo = await AsyncStorage.getItem(Constants.accessToken)
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
                        <Text style={styles.sectionText}>
                            {'Welcome to notiii.me!'}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}