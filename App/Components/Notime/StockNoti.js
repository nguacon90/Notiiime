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
import Constants from '../../Config/Constants'

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
        this.props.notiSetups.forEach(function(item, index){
            this.onOffNoti(true, item.notiiiID);
        }.bind(this));

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

    renderTitle(row) {
        return row.terms[0].code;
    }

    renderCondition(row) {
        var terms = row.terms;
        var text = '';
        terms.forEach(function(term, index){
            if(term.type == Constants.types.STOCK) {
                text += Constants.conditions[term.field] + Constants.operators[term.relation] + ' ' + term.value;
            } else if (term.type == Constants.types.LOGIC) {
                text += typeof Constants.logicals[term.logical] != 'undefined' ? Constants.logicals[term.logical] : ' ';
            }
        });

        return text;
    }

    renderRow(rowData){
        const notiId = rowData.notiiiID;

        return (
            <TouchableHighlight underlayColor='#ddd'>
                <View style ={[styles.rowContainer, styles.listViewRow]}>
                    <View style={{flex: 1}}>
                        <Text style={[styles.labelText, this.state.swithStateNoti[notiId].styleCss, {fontWeight: 'bold'}]}>
                            {this.renderTitle(rowData)}
                        </Text>
                        <Text style={[styles.subtitleLabelText]}>{this.renderCondition(rowData)}</Text>
                    </View>
                    <View style={{justifyContent: 'flex-end'}}>
                        <Switch onValueChange={(value) => {this.onOffNoti(value, notiId)}}
                            value={this.state.swithStateNoti[notiId].status} />
                    </View>
                </View>
            </TouchableHighlight>

        )
    }

    render () {
        return (
            <View style={[styles.mainContainer, styles.stockNotiContainer]}>
                <ScrollView style={[styles.container]}>
                    <ListView style={{marginBottom: 150}}  dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}/>
                </ScrollView>
            </View>
        )
    }
}