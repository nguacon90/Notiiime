import React from "react";
import {Image, ScrollView, View, Text, Picker,StyleSheet } from "react-native";
import { Metrics, ApplicationStyles, Colors, Fonts, Images } from '../Themes/'
import styles from "./Styles/LaunchScreenStyles";
import {Col, FormInput, FormLabel, Grid, Row, Icon, Button} from "react-native-elements";
const Item = Picker.Item;
import vndsService from "../Services/VndsService"
import AutoComplete from 'react-native-autocomplete'
const styles2 = StyleSheet.create({
    autocomplete: {
        alignSelf: 'stretch',
        height: 50,
        margin: 10,
        marginTop: 50,
        backgroundColor: '#FFF',
        borderColor: 'lightblue',
        borderWidth: 1,
    },
    cell: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'lightblue',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cellText: {
        flex: 1,
        marginLeft: 10,
    }
});

const StockCell = ({data}) => (
    <View style={styles.cell} >
        <Text style={styles.cellText}>{data.symbol}</Text>
    </View>
);

export default class NotiMeHome extends React.Component {
    constructor() {
        super();
        this.state = {
            conditionValue: 'price',
            operatorValue: 'gteq',
            ratio: '1',
            stocks: [],
            data: [{symbol: 'AAA', companyName: 'aaaa'}]
        };
        this.onTyping = this.onTyping.bind(this)
    }
    componentDidMount() {
        var self = this;
        vndsService.finfoService().getStocks().then((res) => {
            console.log(res.data.data)
            // self.setState({stocks: res.data.data});
            // self.setState({data: res.data.data});
        })
    }

    onValueChange = (key: string, value: string) => {
        const newState = {};
        newState[key] = value;
        this.setState(newState);
    }

    onSelect(json) {
        alert('You choosed', json.symbol);
    }

    onTyping(text) {
        const data = this.state.stocks
            .filter(s => s.symbol.toLowerCase().startsWith(text.toLowerCase()))
            .map(s => { return {symbol: s.symbol, companyName: s.companyName}})

        this.setState({ data: data });
    }

    render () {

        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
                <ScrollView style={styles.container}>
                    <View style={styles.section} >
                        <Grid containerStyle={styles.gridContainer}>
                            <Row>
                                <Col>
                                    <FormInput inputStyle={styles.formInput} textInputRef="symbol"
                                               containerStyle={styles.containerInput}
                                               placeholder="Mã CK" placeholderTextColor="#78B1AA">
                                    </FormInput>
                                </Col>
                                <Col>
                                    <FormLabel labelStyle={styles.labelText}>Giá khớp: </FormLabel>
                                </Col>
                            </Row>
                            <Row containerStyle={styles.rowContainer}>
                                <Col><FormLabel labelStyle={styles.labelSmall}>Điều kiện: </FormLabel></Col>
                                <Col containerStyle={styles.containerSelect}>
                                    <Picker style={{width: 80}}
                                        selectedValue={this.state.conditionValue}
                                        onValueChange={this.onValueChange.bind(this, 'conditionValue')}>
                                        <Item label="Giá" value="price" />
                                    </Picker>
                                </Col>
                                <Col containerStyle={styles.containerSelect}>
                                    <Picker style={{width: 80}}
                                            selectedValue={this.state.operatorValue}
                                            onValueChange={this.onValueChange.bind(this, 'operatorValue')}>
                                        <Item label=">=" value="gteq" />
                                        <Item label="<=" value="lteq" />
                                    </Picker>
                                </Col>
                                <Col>
                                    <FormInput inputStyle={styles.formInput} textInputRef="value" placeholder="value" placeholderTextColor="#78B1AA"/>
                                </Col>
                            </Row>
                            <Row containerStyle={styles.rowContainer}>
                                <Col containerStyle={{marginTop: 10, alignItems: 'flex-start', width: 30}} onPress={()=>{}}>
                                    <Icon raised={false} name='plus-circle' type='font-awesome'
                                          color='#e2dae5'
                                          containerStyle={{justifyContent: 'flex-start'}}
                                          underlayColor="transparent"
                                          reverseColor="transparent"/>
                                </Col>
                                <Col containerStyle={{alignItems: 'flex-start', marginBottom: 10}} onPress={()=>{}}>
                                    <FormLabel labelStyle={styles.labelText}>Thêm</FormLabel>
                                </Col>
                            </Row>
                            <Row containerStyle={styles.rowContainer}>
                                <Col><FormLabel labelStyle={[styles.labelSmall, {width: 200}]}>Tần suất nhận: </FormLabel></Col>
                                <Col containerStyle={styles.containerSelect}>
                                    <Picker style={{width: 150}}
                                            selectedValue={this.state.ratio}
                                            onValueChange={this.onValueChange.bind(this, 'ratio')}>
                                        <Item label="Trong 1 ngày" value="1" />
                                        <Item label="Trong 5 ngày" value="5" />
                                    </Picker>
                                </Col>
                            </Row>

                            <Row containerStyle={styles.rowContainer}>
                                <Col containerStyle={{width: 90}}><FormLabel labelStyle={[styles.labelSmall, {width: 90}]}>Ghi chú: </FormLabel></Col>
                                <Col containerStyle={styles.containerSelect}>
                                    <FormInput inputStyle={[styles.formInput, {width: Metrics.screenWidth}]} textInputRef="note" placeholderTextColor="#78B1AA"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col containerStyle={{alignItems: 'center'}}>
                                    <Button buttonStyle={{width: 100, marginTop: 20}} backgroundColor="#18BA9C" borderRadius={5} title='Tạo Noti' />
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                </ScrollView>
            </View>
        )
    }
}