/**
 * Created by minh on 16/04/2017.
 */
import React from "react";
import {AsyncStorage, View, Text, ScrollView} from "react-native";
import {Actions} from "react-native-router-flux";
import Constants from "../../Config/Constants";
import styles from '../../Containers/Styles/LaunchScreenStyles'

export default class NotiMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId : '',
            notiSetups: []
        }
    }
    componentDidMount() {
        this.getUserId();
    }

    async getUserId() {
        this.props.showLoading(true);
        var userInfo = await AsyncStorage.getItem(Constants.accessToken)
        if (typeof userInfo === 'string') {
            var userModel = JSON.parse(userInfo);
            this.setState({
                userId: userModel.userID
            });
            this.loadNotiSetups();
        } else {
            Actions.loginScreen();
        }
    }

    loadNotiSetups() {
        if(this.state.notiSetups.length == 0) {
            Actions.emptyNoti();
            this.props.showLoading(false);
            return;
        }
        this.props.showLoading(false);
    }

    render () {
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={[styles.container]} contentContainerStyle={styles.containerCenter}>
                    <View style={[styles.section]} >
                        <View style={styles.sectionCenter}>

                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}