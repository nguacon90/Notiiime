/**
 * Created by minh on 09/05/2017.
 */

import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';
import {Metrics, Colors, Fonts} from '../../Themes'

export default class ModalElert extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {this.props.showError(false)}}>
                <View style={{flex: 1, flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
                    <View style={{borderRadius: 5, backgroundColor: Colors.frost, width: 250, height: 150}}>
                        <View style={{borderBottomWidth: 0.6, borderBottomColor: Colors.charcoal, justifyContent:'center',
                            alignItems: 'center', paddingTop: 5, paddingBottom: 10, height: 100}}>
                            <View><Text style={[Fonts.style.h6, {paddingBottom: 10, fontWeight: Fonts.weight.bold}]}>Notiime</Text></View>
                            <View>
                                <Text style={[Fonts.style.normal, {textAlign:'center'}]}>{this.props.message}</Text>
                            </View>
                        </View>

                        <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.25)'} onPress={() => {
                            this.props.showError(false);
                        }} style={{justifyContent:'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10,}}>
                            <Text style={[Fonts.style.h6, { }]}>OK</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }
}
