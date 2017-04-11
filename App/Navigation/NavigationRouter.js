import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import LaunchScreen from '../Containers/LaunchScreen'
import NotiMeHome from '../Containers/NotiMeHome'
import {Icon} from "react-native-elements";

class NavigationRouter extends Component {
    renderMenuIcon = () => {
        return (
            <Icon type={'font-awesome'} name={'align-justify'} onPress={()=>{}}/>
        );
    }
    render () {
            {/*renderRightButton={this.renderMenuIcon}*/}
        return (
          <Router>
              <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar}
                     titleStyle={Styles.title}
                     leftButtonIconStyle={Styles.leftButton}
                     rightButtonTextStyle={Styles.rightButton}
              >
                  <Scene initial key='homeScreen' component={LaunchScreen} title='Home Page'/>
                  <Scene key='notiiimeHome' component={NotiMeHome} title="Noti mới"/>
              </Scene>
          </Router>
        )
    }
}

export default NavigationRouter
