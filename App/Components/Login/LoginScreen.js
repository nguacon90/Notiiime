import React from "react";
import {AsyncStorage, ScrollView, Text, View} from "react-native";
import styles from "../../Containers/Styles/LaunchScreenStyles";
import {Icon} from 'react-native-elements'
import Constants from "../../Config/Constants";
import LoginFacebook from "./LoginFacebook";
import SplashScreen from 'react-native-splash-screen'
import {Actions} from 'react-native-router-flux'
import vndsService from "../../Services/VndsService"

export default class NotiMeHome extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.getUserId();
        this.props.showBottomMenu(false);
    }

    async getUserId() {
        this.props.showLoading(true);
        var userInfo = await AsyncStorage.getItem(Constants.accessToken)
        if (typeof userInfo === 'string') {
            var userModel = JSON.parse(userInfo);
            this.setState({
                userId: userModel.userID
            });
            this.props.showBottomMenu(true);
            SplashScreen.hide();
            vndsService.clientMQTT("1001", "signal", function(message){
               alert(message);
            }, function(errMessage){
                console.log(errMessage)
            }).start();
            Actions.notime();
        }

        this.props.showLoading(false);
        SplashScreen.hide();
    }

    render () {

        return (
            <View style={styles.mainContainer}>
                <ScrollView style={[styles.container]} contentContainerStyle={styles.containerCenter}>
                    <View style={[styles.section]} >
                        <View style={styles.sectionCenter}>
                            <Icon iconStyle={styles.iconNoti} name="signal" type="font-awesome"/>
                            <Text style={styles.textNoti}>Notiii.me</Text>
                        </View>
                        <LoginFacebook renderMenuLogin={this.props.renderMenuLogin.bind(this)}/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}