/**
 * Created by minh on 17/04/2017.
 */
/**
 * Created by minh on 16/04/2017.
 */
import React from "react";
import {ScrollView, Text, View} from "react-native";
import styles from "../../Containers/Styles/LaunchScreenStyles";
import {Button, Icon} from "react-native-elements";
import {Actions} from "react-native-router-flux";

export default class NotiMe extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={[styles.container]} contentContainerStyle={styles.containerCenter}>
                     <View style={[styles.section]} >
                         <View style={styles.sectionCenter}>
                             <Text>Click </Text>
                             <Icon iconStyle={styles.iconAddNoti} name="plus-circle" type="font-awesome"/>
                             <Text> để tạo noti mới.</Text>
                         </View>

                         <Button title="Tạo noti" buttonStyle={styles.btnDefault} onPress={() => {Actions.createNotime()}}/>
                     </View>
                 </ScrollView>
            </View>
        )
    }
}