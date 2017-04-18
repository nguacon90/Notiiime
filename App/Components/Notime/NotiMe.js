/**
 * Created by minh on 16/04/2017.
 */
import React from "react";
import {AsyncStorage, View, Text, ScrollView} from "react-native";
import {Tabs, Tab, Icon} from 'react-native-elements'
import {Actions} from "react-native-router-flux";
import Constants from "../../Config/Constants";
import styles from '../../Containers/Styles/LaunchScreenStyles'
import StockNoti from './StockNoti'

export default class NotiMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId : '',
            notiSetups: [{}],
            selectedTab: 'stock'
        }
    }
    componentDidMount() {
        this.getUserId();
    }

    async getUserId() {
        this.props.showLoading(true);
        var userInfo = await AsyncStorage.getItem(Constants.accessToken)
        if (typeof userInfo === 'string') {
            var userModel = JSON.parse(userInfo);
            this.setState({
                userId: userModel.userID
            });
            this.loadNotiSetups();
        } else {
            Actions.loginScreen();
        }
    }

    loadNotiSetups() {
        if(this.state.notiSetups.length == 0) {
            Actions.emptyNoti();
            this.props.showLoading(false);
            return;
        }
        this.props.showLoading(false);
    }

    changeTab (selectedTab) {
        this.setState({selectedTab: selectedTab})
    }

    render () {
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={[styles.container]} contentContainerStyle={{flex:1}}>
                    <View style={styles.tabBarWithNav}>
                        <Tabs tabBarStyle={styles.tabBarView} sceneStyle={styles.scenseTabContent}>
                            <Tab selectedTitleStyle={styles.selectedTitle}
                                titleStyle={styles.titleTextDefault}
                                selected={this.state.selectedTab === 'stock'}
                                title={'Mã'}
                                onPress={() => this.changeTab('stock')}>
                                <StockNoti/>
                            </Tab>
                            <Tab selectedTitleStyle={styles.selectedTitle}
                                titleStyle={styles.titleTextDefault}
                                selected={this.state.selectedTab === 'market'}
                                title={'Thị trường'}
                                onPress={() => this.changeTab('market')}>
                                <View style={{height: 100, flex: 1, flexDirection: "row"}}>
                                    <Text>Tab 2</Text>
                                </View>
                            </Tab>
                        </Tabs>
                    </View>
                </ScrollView>
            </View>
        )
    }
}