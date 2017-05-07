import React, { Component } from 'react'
import {SideMenu, List, ListItem} from 'react-native-elements'
import { View, StatusBar, Text, ScrollView} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import NavigationRouter from '../Navigation/NavigationRouter'
import BottomNavigation from '../Navigation/BottomNavigation'
import MenuComp from '../Components/Menu/Menu'
import styles from './Styles/RootContainerStyles'
import Colors from '../Themes/Colors'

class RootContainer extends Component {
    constructor () {
        super()
        this.state = {
            isOpen: false,
            isLoading: false,
            visibleBottomMenu: true,
            loginIcon: 'sign-in',
            loginText: 'Đăng nhập'
        }
    }

    renderMenuLogin = (isLogin) => {
        this.setState({
            loginIcon: isLogin ? 'sign-in' : 'sign-out',
            loginText: isLogin ? 'Đăng nhập': 'Đăng xuất'
        });
    }

    onSideMenuChange (isOpen: boolean) {
        this.setState({
            isOpen: isOpen
        })
    }

    toggleSideMenu () {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    showBottomMenu(isShow) {
        this.setState({
            visibleBottomMenu: isShow
        })
    }

    showLoading (isLoading) {
        this.setState({
            isLoading: isLoading
        })
    }

    render() {
        const menu = <MenuComp toggleSideMenu={this.toggleSideMenu.bind(this)} loginIcon={this.state.loginIcon}
                        loginText={this.state.loginText} renderMenuLogin={this.renderMenuLogin.bind(this)}/>
        return (
            <View style={styles.applicationView}>
                <Spinner visible={this.state.isLoading} textContent={"Vui lòng đợi..."}
                         textStyle={{"color": Colors.silver}} />
                <SideMenu menuPosition={'left'}
                    isOpen={this.state.isOpen}
                    onChange={this.onSideMenuChange.bind(this)}
                    menu={menu}>
                    <StatusBar barStyle='light-content'/>
                    <NavigationRouter showLoading={this.showLoading.bind(this)}
                                      toggleSideMenu={this.toggleSideMenu.bind(this)}
                                      showBottomMenu={this.showBottomMenu.bind(this)}
                                      renderMenuLogin={this.renderMenuLogin.bind(this)}/>
                    <BottomNavigation showBottomMenu={this.showBottomMenu.bind(this)}
                                      visibility={this.state.visibleBottomMenu}
                                      toggleSideMenu={this.toggleSideMenu.bind(this)}/>
                </SideMenu>
            </View>
        )
    }
}

export default RootContainer