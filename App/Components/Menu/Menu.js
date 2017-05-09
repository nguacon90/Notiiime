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
            facebookAvatarUri: null
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
                    title: userModel.name,
                    userInfo: userInfo,
                    facebookAvatarUri: Constants.facebookAvartarUri.replace('{userId}', userModel.userID)
                });
                this.props.renderMenuLogin(false);
            }
        }
    }

    async signout() {
        if(this.state.userInfo != null && this.state.userInfo != Constants.loginMethods.facebook) {
            LoginManager.logOut();
            await AsyncStorage.removeItem(Constants.accessToken);
            this.setState({
                title: "Menu",
            })
            this.props.renderMenuLogin(true);
            this.props.toggleSideMenu();
            Actions.loginScreen();
        }
    }

    render() {
        return (
            <View style={[MenuStyles.container, MenuStyles.containerMenu]}>
                <View style={MenuStyles.appTitle}><Text style={MenuStyles.textAppName}>{Constants.appName}</Text></View>
                <List containerStyle={[MenuStyles.listContainer, MenuStyles.firstListContainer]} >
                    <ListItem containerStyle={[MenuStyles.item, MenuStyles.itemAccount]}
                              avatar={{uri: this.state.facebookAvatarUri}}
                              onPress={() => {this.props.toggleSideMenu(); Actions.notime();}}
                              title={this.state.title} titleStyle={[MenuStyles.itemTitle, {fontWeight: 'bold'}]}
                    />
                    <ListItem containerStyle={MenuStyles.item}
                              leftIcon={{name:'signal', type:"font-awesome", size: Constants.sizeIcon, color: Colors.defaultText}}
                              onPress={() => {this.props.toggleSideMenu(); Actions.notime();}}
                              title={Constants.menu.noti} titleStyle={MenuStyles.itemTitle}
                    />

                    <ListItem containerStyle={MenuStyles.item}
                              leftIcon={{name:'eye', type:"font-awesome", size: Constants.sizeIcon, color: Colors.defaultText}}
                              onPress={() => {this.props.toggleSideMenu();}}
                              title={Constants.menu.watchList} titleStyle={MenuStyles.itemTitle}
                    />
                    <ListItem containerStyle={MenuStyles.item}
                              leftIcon={{name:'sliders', type:"font-awesome", size: Constants.sizeIcon, color: Colors.defaultText}}
                              onPress={() => {this.props.toggleSideMenu();}}
                              title={Constants.menu.screener} titleStyle={MenuStyles.itemTitle}
                    />
                    <ListItem containerStyle={MenuStyles.item}
                              leftIcon={{name:'save', type:"font-awesome", size: Constants.sizeIcon, color: Colors.defaultText}}
                              onPress={() => {this.props.toggleSideMenu();}}
                              title={Constants.menu.template} titleStyle={MenuStyles.itemTitle}
                    />
                </List>
                <List containerStyle={MenuStyles.listContainer}>
                    <ListItem containerStyle={MenuStyles.item}
                              leftIcon={{name:'star-o', type:"font-awesome", size: Constants.sizeIcon, color: Colors.defaultText}}
                              onPress={() => {this.props.toggleSideMenu();}}
                              title={Constants.menu.rating} titleStyle={MenuStyles.itemTitle}
                    />
                    <ListItem containerStyle={MenuStyles.item}
                              leftIcon={{name:'comments-o', type:"font-awesome", size: Constants.sizeIcon, color: Colors.defaultText}}
                              onPress={() => {this.props.toggleSideMenu();}}
                              title={Constants.menu.feedback} titleStyle={MenuStyles.itemTitle}
                    />
                    <ListItem containerStyle={MenuStyles.item}
                              leftIcon={{name:'share-alt', type:"font-awesome", size: Constants.sizeIcon, color: Colors.defaultText}}
                              onPress={() => {this.props.toggleSideMenu();}}
                              title={Constants.menu.inviteFriends} titleStyle={MenuStyles.itemTitle}
                    />
                    <ListItem containerStyle={MenuStyles.item}
                              leftIcon={{name: this.props.loginIcon, type:"font-awesome", size: Constants.sizeIcon, color: Colors.defaultText}}
                              onPress={() => {this.doLoginOrLogout()}}
                              title={this.props.loginText} titleStyle={MenuStyles.itemTitle}
                    />
                </List>
            </View>
        );
    }
}

export default MenuComp