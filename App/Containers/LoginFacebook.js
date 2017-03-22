import React, { Component } from 'react'
import { View } from 'react-native'
const FBSDK = require('react-native-fbsdk');
const {
    LoginButton,
    AccessToken
} = FBSDK;

class LoginFacebook extends Component {
    render() {
        return (
            <View>
                <LoginButton
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={
            (error, result) => {
              if (error) {
                alert("login has error: " + result.error);
              } else if (result.isCancelled) {
                alert("login is cancelled.");
              } else {
                  console.log(error, result)
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    //alert(data.accessToken.toString())
                  }
                )
              }
            }
          }
                    onLogoutFinished={() => alert("logout.")}/>
            </View>
        )
    }
}

export default LoginFacebook