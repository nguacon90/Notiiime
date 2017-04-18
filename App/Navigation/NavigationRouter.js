import React, {Component} from "react";
import {ActionConst, Router, Scene, Actions} from "react-native-router-flux";
import Styles from "./Styles/NavigationContainerStyles";
import NotiMe from "../Components/Notime/NotiMe";
import LoginScreen from "../Components/Login/LoginScreen";
import CreateNotime from "../Components/Notime/CreateNotiMe";
import EmptyNotimeScreen from "../Components/Notime/EmptyNotimeScreen"
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
            <Icon type="font-awesome" name="navicon" iconStyle={{color: "#fff"}} onPress={this.props.toggleSideMenu}/>
        );
    }

    renderAddNotiBtn = () => {
        return (
            <Icon type="font-awesome" name="plus-circle" iconStyle={{color: "#fff"}} onPress={this.createNewNoti}/>
        );
    }

    createNewNoti = () => {
        Actions.createNotime();
    }

    render () {
        return (
          <Router renderLeftButton={this.renderMenuIcon}>
              <Scene key='drawerChildrenWrapper' navigationBarStyle={Styles.navBar}
                     titleStyle={Styles.title}

                     leftButtonIconStyle={Styles.leftButton}
                     rightButtonTextStyle={Styles.rightButton}
              >
                  <Scene showLoading={this.props.showLoading.bind(this)}
                         showBottomMenu={this.props.showBottomMenu.bind(this)}
                         renderMenuLogin={this.props.renderMenuLogin.bind(this)}
                         key='loginScreen' component={LoginScreen} initial
                         title='Đăng nhập' passProps={true} type={ActionConst.REPLACE}/>

                  <Scene showLoading={this.props.showLoading.bind(this)}  key='notime'
                         component={NotiMe} title="Noti" passProps={true}
                         type={ActionConst.REPLACE}
                         renderRightButton={this.renderAddNotiBtn}/>

                  <Scene showLoading={this.props.showLoading.bind(this)}
                         key='emptyNoti' component={EmptyNotimeScreen}
                         title='Noti' passProps={true} type={ActionConst.REPLACE}
                         renderRightButton={this.renderAddNotiBtn}/>

                  <Scene showLoading={this.props.showLoading.bind(this)}  key='createNotime'
                         component={CreateNotime} title="Noti" passProps={true}
                         renderRightButton={this.renderAddNotiBtn}
                         type={ActionConst.REPLACE}/>
              </Scene>
          </Router>
        )
    }
}

export default NavigationRouter
