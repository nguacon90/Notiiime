/**
 * Created by minh on 27/04/2017.
 */
import React from "react";
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';
import Constants from '../../Config/Constants'
import {View, Platform, AsyncStorage} from 'react-native'
import vndsService from "../../Services/VndsService";

export default class FcmNoti extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }
    componentDidMount() {
        this.getUserId();
        FCM.requestPermissions(); // for iOS
    }

    syncFcmTokenToServer() {
        var self = this;

        AsyncStorage.getItem(Constants.fcmTokenKey, (err, fcmTokenKey) => {
            FCM.getFCMToken().then(token => {
                if(token != fcmTokenKey) {
                    vndsService.fcmNotiService().registerToken({
                        userID: self.state.userId,
                        fcmKey: token
                    });
                    AsyncStorage.setItem(Constants.fcmTokenKey, token);
                } else {
                    alert('Do nothing')
                }

                self.registerNotificationListener();
            });
        });

        FCM.on(FCMEvent.RefreshToken, (token) => {
            if(self.state.userId) {
                vndsService.fcmNotiService().registerToken({
                    userID: self.state.userId,
                    fcmKey: token
                })
            }
        });
    }

    getUserId() {
        var self = this;
        AsyncStorage.getItem(Constants.accessToken, (err, userInfo) => {
            if (typeof userInfo === 'string') {
                var userModel = JSON.parse(userInfo);
                self.setState({
                    userId: userModel.userID
                });
                self.syncFcmTokenToServer();
            }
        });

    }

    registerNotificationListener() {
        FCM.on(FCMEvent.Notification, async (notif) => {
            var fcmNoti = notif.fcm;
            if(fcmNoti) {
                FCM.presentLocalNotification({
                    id: Constants.deviceId,                               // (optional for instant notification)
                    title: fcmNoti.title,                     // as FCM payload
                    body: fcmNoti.body,                    // as FCM payload (required)
                    sound: "default",                                   // as FCM payload
                    priority: "normal",                                   // as FCM payload
                    click_action: "ACTION",                             // as FCM payload
                    badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
                    number: 10,                                         // Android only
                    ticker: "Notiiime",
                    auto_cancel: true,                                  // Android only (default true)
                    large_icon: "ic_launcher",                           // Android only
                    icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
                    big_text: fcmNoti.body,     // Android only
                    sub_text: "Chúc bạn đầu tư thành công.",                      // Android only
                    color: "red",                                       // Android only
                    vibrate: 300,                                       // Android only default: 300, no vibration if you pass null
                    tag: 'some_tag',                                    // Android only
                    group: "group",                                     // Android only
                    my_custom_data:'my_custom_field_value',             // extra data you want to throw
                    lights: true,                                       // Android only, LED blinking (default false)
                    // show_in_foreground                                  // notification when app is in foreground (local & remote)
                });
            }

            if(Platform.OS ==='ios'){
                //optional
                //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
                //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
                //notif._notificationType is available for iOS platfrom
                switch(notif._notificationType){
                    case NotificationType.Remote:
                        notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                        break;
                    case NotificationType.NotificationResponse:
                        notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                        break;
                }
            }
        });
    }

    componentWillUnmount() {
        // stop listening for events
        //this.notificationListener.remove();
        //this.refreshTokenListener.remove();
    }

    render() {
        return (
            <View></View>
        )
    }
}