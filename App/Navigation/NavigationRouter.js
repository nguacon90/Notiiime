import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'

// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
          <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar} titleStyle={Styles.title} leftButtonIconStyle={Styles.leftButton} rightButtonTextStyle={Styles.rightButton}>
              <Scene initial key='launchScreen' component={LaunchScreen} title='LaunchScreen' hideNavBar />
          </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
