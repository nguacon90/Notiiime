import React, {Component} from "react";
import { ScrollView, Text, Image, View, AsyncStorage } from 'react-native'
import {List, ListItem, Icon} from "react-native-elements";
import {Actions} from "react-native-router-flux";
import MenuStyles from "./MenuStyles";
import Colors from "../../Themes/Colors";
import Constants from '../../Config/Constants'
const FBSDK = require('react-native-fbsdk');
const {
    LoginManager
} = FBSDK;

class MenuComp extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: 'Menu',
            userInfo: null,
            signInOut: 'Đăng nhập',
            signInOutIcon: 'sign-in'
        }
    }

    componentDidMount() {
        this.checklogin().done()

    }

    doLoginOrLogout() {
        if(this.state.userInfo != null) {
            this.signout();
        } else {
            Actions.loginScreen();
            this.props.toggleSideMenu(false);
        }
    }

    async checklogin() {
        var userInfo = await AsyncStorage.getItem(Constants.accessToken)
        if(typeof userInfo === 'string') {
            var userModel = JSON.parse(userInfo);
            if(userModel.expiredTime >= new Date().getTime()) {
                this.setState({
                    title: userModel.name.toUpperCase(),
                    userInfo: userInfo,
                    signInOut: 'Đăng xuất',
                    signInOutIcon: 'sign-out'
                })
            }
        }
    }

    async signout() {
        if(this.state.userInfo != null && this.state.userInfo != Constants.loginMethods.facebook) {
            LoginManager.logOut();
            await AsyncStorage.removeItem(Constants.accessToken);
            this.setState({
                title: "Menu",
                signInOut: 'Đăng nhập',
                signInOutIcon: 'sign-in'
            })
            this.props.toggleSideMenu();
            Actions.loginScreen();
        }
    }

    render() {
        return (
            <View style={[MenuStyles.container, MenuStyles.containerMenu]}>
                <View style={MenuStyles.title}>
                    <Text style={MenuStyles.username}>{this.state.title}</Text>
                </View>
                <List containerStyle={MenuStyles.listContainer}>
                    <ListItem containerStyle={MenuStyles.item}
                              leftIcon={{name:'bell-o', type:"font-awesome", size: 20, color: Colors.defaultText}}
                        onPress={() => {this.props.toggleSideMenu(); Actions.notime();}}
                        title="Notiii me" titleStyle={MenuStyles.itemTitle}
                    />

                    <ListItem containerStyle={MenuStyles.item}
                              leftIcon={{name: this.state.signInOutIcon, type:"font-awesome", size: 20, color: Colors.defaultText}}
                              onPress={() => {this.doLoginOrLogout()}}
                              title={this.state.signInOut} titleStyle={MenuStyles.itemTitle}
                    />
                </List>
            </View>
        );
    }
}

export default MenuComp