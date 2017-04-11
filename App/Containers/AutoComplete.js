import React, { Component } from 'react'
import {View, Text, ScrollView,  TouchableHighlight, TouchableOpacity} from 'react-native'
import appStyles from '../Themes/ApplicationStyles'

class AutoComplete extends Component {
    constructor(props) {
        super(props);
    }

    handleTouch(symbol) {
        this.props.callback(symbol);
    }

    render() {
        if (this.props.visibility) {
            var symbols = [];
            if(typeof this.props.stocks !== 'undefined') {
                var self = this;
                symbols = this.props.stocks.map(function(stock, index){
                    return (
                        <View  key={index}>
                            <TouchableOpacity onPress={this.handleTouch.bind(this, stock.symbol)}>
                                <Text style={appStyles.defaultText}>{stock.symbol}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                }.bind(this));
            }

            return (
                <View>
                    <ScrollView horizontal={true} style={appStyles.autocompleteView} keyboardShouldPersistTaps={"always"}>
                        {symbols}
                    </ScrollView>
                </View>
            );
        }

        return null;
    }
}

export default AutoComplete;