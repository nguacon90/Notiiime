import React, { Component } from 'react'
import {SideMenu, List, ListItem} from 'react-native-elements'
import { View, StatusBar, Text } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import MenuComp from './Menu'
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
    constructor () {
        super()
        this.state = {
            isOpen: false
        }
        this.toggleSideMenu = this.toggleSideMenu.bind(this)
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

    render() {
        const menu = <MenuComp />
        return (
            <View style={styles.applicationView}>
                <SideMenu menuPosition={'left'}
                    isOpen={this.state.isOpen}
                    onChange={this.onSideMenuChange.bind(this)}
                    menu={menu}>
                    <StatusBar barStyle='light-content'/>
                    <NavigationRouter toggleSideMenu={this.toggleSideMenu.bind(this)} />
                </SideMenu>
            </View>
        )
    }
}

export default RootContainer