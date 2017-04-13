import React, { Component } from 'react'
import Tabs from 'react-native-tabs'
import {Text, Keyboard, View} from 'react-native'
import {Icon} from 'react-native-elements'
import styles from './Styles/NavigationContainerStyles'
import Colors from '../Themes/Colors'
import {Actions} from 'react-native-router-flux'

class BottomNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'noti',
            menu: Colors.snow,
            noti: Colors.snow,
            market: Colors.snow,
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
        if(name === 'menu') {
            this.props.toggleSideMenu();
            return;
        } else if(name === 'noti') {
            Actions.notiiimeHome();
        } else if(name === 'home') {
            Actions.homeScreen();
        }

        this.setState({
            page: name,
            home: name === 'home' ? Colors.black : Colors.snow,
            noti: name === 'noti' ? Colors.black : Colors.snow,
            market: name === 'market' ? Colors.black : Colors.snow,
        });
    }

    render() {
        if(this.props.visibility) {
            return (
                <Tabs selected={this.state.page} style={styles.bottomMenu}
                      selectedStyle={{}} onSelect={el=> {this.onSelectedTab(el)}}>
                    <View name="menu">
                        <Icon containerStyle={{}} color={this.state.menu} name='align-justify' type="font-awesome"></Icon>
                        <Text style={{color: this.state.menu}}>Menu</Text>
                    </View>
                    <View name="home">
                        <Icon containerStyle={{}} color={this.state.home} name='newspaper-o' type="font-awesome"></Icon>
                        <Text style={{color: this.state.home}}>Trang chủ</Text>
                    </View>
                    <View name="noti">
                        <Icon containerStyle={{}} color={this.state.noti} name='bell-o' type="font-awesome"></Icon>
                        <Text style={{color: this.state.noti}}>Notiii me</Text>
                    </View>
                    <View name="market">
                        <Icon containerStyle={{}} color={this.state.market} name='line-chart'  type="font-awesome"></Icon>
                        <Text style={{color: this.state.market}}>Thị trường</Text>
                    </View>
                </Tabs>
            )
        }
        return null;
    }
}

export default BottomNavigation