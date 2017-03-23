import React, { Component } from 'react'
import { View, AsyncStorage } from 'react-native'
import {Actions} from 'react-native-router-flux'
import Constants from '../Config/Constants'
import fbStyles from './Styles/FacebookStyles'
const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    AccessToken,
    GraphRequest,
    GraphRequestManager
} = FBSDK;

class LoginFacebook extends Component {
    render() {
        return (
            <View>
                <LoginButton style={fbStyles}
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={
            (error, result) => {
              if (error) {

                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                     var token = data.accessToken;
                     const rq = new GraphRequest('/me', {
                          httpMethod: 'GET',
                          version: 'v2.8',
                          accessToken: token
                      }, (err, res) => {
                          AsyncStorage.setItem(Constants.accessToken, JSON.stringify({
                              userID: data.userID,
                              accessToken: token,
                              name: res.name
                          }), () => {
                              Actions.notiiimeHome();
                          });
                      });

                     new GraphRequestManager().addRequest(rq).start()

                  }
                )
              }
            }
          } onLogoutFinished={() => {
              AsyncStorage.removeItem(Constants.accessToken)
                }}/>
            </View>
        )
    }
}

export default LoginFacebook