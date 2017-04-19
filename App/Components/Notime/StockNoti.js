/**
 * Created by minh on 19/04/2017.
 */
/**
 * Created by minh on 17/04/2017.
 */
/**
 * Created by minh on 16/04/2017.
 */
import React from "react";
import {ScrollView, View, Switch, ListView, TouchableHighlight, Text} from "react-native";
import styles from "../../Containers/Styles/LaunchScreenStyles";
import Colors from '../../Themes/Colors'

export default class StockNoti extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.state = {
            swithStateNoti: {},
            dataSource: ds
        }
    }
    componentDidMount() {
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this.props.notiSetups),
        })
    }

    onOffNoti(value, notiId) {
        var onOffNoti = this.state.swithStateNoti;
        onOffNoti[notiId] = {
            status: value,
            styleCss: {
                color: value ? Colors.defaultText : Colors.gray
            }
        };
        this.setState({onOffNoti});
    }

    renderRow(rowData){
        return (
            <TouchableHighlight underlayColor='#ddd'>
                <View style ={[styles.rowContainer, styles.listViewRow]}>
                    <View style={{flex: 1}}>
                        <Text style={[styles.labelText, this.state.swithStateNoti[rowData.notiId].styleCss]}>{rowData.code}</Text>
                        <Text style={[styles.subtitleLabelText, this.state.swithStateNoti[rowData.notiId].styleCss]}>{rowData.text}</Text>
                    </View>
                    <View style={{justifyContent: 'flex-end'}}>
                        <Switch onValueChange={(value) => {this.onOffNoti(value, rowData.notiId)}}
                            value={this.state.swithStateNoti[rowData.notiId].status} />
                    </View>
                </View>
            </TouchableHighlight>

        )
    }

    render () {
        return (
            <View style={[styles.mainContainer, styles.stockNotiContainer]}>
                <ScrollView style={[styles.container]}>
                    <ListView  dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}/>
                </ScrollView>
            </View>
        )
    }
}