import React, { Component } from 'react'
import { Scene, Router, ActionConst } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import LaunchScreen from '../Containers/LaunchScreen'
import NotiMeHome from '../Containers/NotiMeHome'
import {Icon} from "react-native-elements";

class NavigationRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'first'
        }
    }

    renderMenuIcon = () => {
        return (
            <Icon type={'font-awesome'} name={'align-justify'} onPress={()=>{}}/>
        );
    }
    render () {
        return (
          <Router>
              <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar}
                     titleStyle={Styles.title}
                     leftButtonIconStyle={Styles.leftButton}
                     rightButtonTextStyle={Styles.rightButton}
              >
                  <Scene showLoading={this.props.showLoading.bind(this)} initial
                         key='homeScreen' component={LaunchScreen}
                         title='Home Page' passProps={true} type={ActionConst.REPLACE}/>
                  <Scene showLoading={this.props.showLoading.bind(this)} key='notiiimeHome'
                         component={NotiMeHome} title="Noti mới" passProps={true}
                         type={ActionConst.REPLACE}/>
              </Scene>
          </Router>
        )
    }
}

export default NavigationRouter
