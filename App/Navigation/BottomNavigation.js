import React, { Component } from 'react'
import Tabs from 'react-native-tabs'
import {Text, Keyboard, View} from 'react-native'
import {Icon} from 'react-native-elements'
import styles from './Styles/NavigationContainerStyles'
import Colors from '../Themes/Colors'
import {Actions} from 'react-native-router-flux'
import Constants from '../Config/Constants'

class BottomNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'noti',
            screener: Colors.black,
            noti: Colors.background,
            watchlist: Colors.black,
            home: Colors.black,
        }
    }
    componentWillMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }
    _keyboardDidShow () {
        this.props.showBottomMenu(false);
    }

    _keyboardDidHide () {
        this.props.showBottomMenu(true);
    }

    onSelectedTab(el) {
        var name = el.props.name;
        if(name === 'noti') {
            Actions.notime();
        }

        this.setState({
            page: name,
            home: name === 'home' ? Colors.background : Colors.black,
            noti: name === 'noti' ? Colors.background : Colors.black,
            market: name === 'market' ? Colors.background : Colors.black,
        });
    }

    render() {
        if(this.props.visibility) {
            return (
                <Tabs selected={this.state.page} style={styles.bottomMenu}
                      selectedStyle={{}} onSelect={el=> {this.onSelectedTab(el)}}>
                    <View name="noti">
                        <Icon size={Constants.sizeIcon} containerStyle={{}} color={this.state.noti} name='signal' type="font-awesome"></Icon>
                        <Text style={{color: this.state.noti}}>{Constants.menu.noti}</Text>
                    </View>
                    <View name="watchlist">
                        <Icon size={Constants.sizeIcon} containerStyle={{}} color={this.state.watchlist} name='eye'  type="font-awesome"></Icon>
                        <Text style={{color: this.state.watchlist}}>{Constants.menu.watchList}</Text>
                    </View>
                    <View name="screener">
                        <Icon size={Constants.sizeIcon} containerStyle={{}} color={this.state.screener} name='sliders'  type="font-awesome"></Icon>
                        <Text style={{color: this.state.screener}}>{Constants.menu.screener}</Text>
                    </View>
                </Tabs>
            )
        }
        return null;
    }
}

export default BottomNavigation