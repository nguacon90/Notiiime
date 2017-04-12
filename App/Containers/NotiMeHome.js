import React from "react";
import {Image, ScrollView, View, Text, Picker,StyleSheet, Keyboard} from "react-native";
import { Metrics, ApplicationStyles, Colors, Fonts, Images } from '../Themes/'
import styles from "./Styles/LaunchScreenStyles";
import {Col, FormInput, FormLabel, Grid, Row, Icon, Button} from "react-native-elements";
const Item = Picker.Item;
import vndsService from "../Services/VndsService"
import AutoComplete from './AutoComplete'

export default class NotiMeHome extends React.Component {
    constructor() {
        super();
        this.state = {
            symbol: '',
            matchPrice: '',
            priceColor: Colors.transparent,
            field: 'matchedPrice',
            relation: 'GTEQ',
            value: '',
            note: '',
            ratio: '1',
            stocks: [],
            data: [],
            isShowAutoComplete: false
        };
    }
    componentDidMount() {
        if(this.state.stocks.length == 0) {
            var self = this;
            vndsService.finfoService().getStocks().then((res) => {
                if(res.data) {
                    self.setState({stocks: res.data.data});
                }
            });
        }
    }

    autocomplete(text) {
        this.setState({
            isShowAutoComplete: true
        });

        var data = [];
        this.state.stocks.forEach(function(stock, index){
            if(stock.symbol.toUpperCase().startsWith(text.toUpperCase())) {
                data.push(stock);
            }
        });

        this.setState({
            data: data,
            symbol: text
        });
    }

    onValueChange = (key: string, value: string) => {
        const newState = {};
        newState[key] = value;
        this.setState(newState);
    }

    handleSelectedSymbol(symbol) {
        if(typeof symbol == 'undefined'){
            symbol = this.refs.symbol.props.value.toUpperCase();
        }
        this.setState({
            symbol: symbol,
            isShowAutoComplete: false
        });
        var self = this;
        Keyboard.dismiss();
        vndsService.priceService().getStockBy(symbol).then(function(res){
            if(res.data && res.data.length != 0) {
                var stockInfo = vndsService.messageUnmashaller().map.STOCK(res.data[0]);
                var matchPrice = stockInfo.matchPrice;
                self.setState({
                    matchPrice: matchPrice,
                    priceColor: self.getColor(stockInfo)
                });
            }
        });
    }

    getColor(stockInfo) {
        var matchPrice = stockInfo.matchPrice;
        var basicPrice = stockInfo.basicPrice;
        var floorPrice = stockInfo.floorPrice;
        var ceilingPrice = stockInfo.ceilingPrice;

        if(matchPrice == ceilingPrice) {
            return Colors.ceilingColor;
        }

        if(matchPrice == basicPrice) {
            return Colors.basicColor;
        }

        if(matchPrice == floorPrice) {
            return Colors.floorColor;
        }

        if(matchPrice < basicPrice) {
            return Colors.decreaseColor;
        }

        if(matchPrice > basicPrice) {
           return Colors.increaseColor;
        }
    }

    createNotiiime() {
        var notiiData = {
            frequencyOfReceipt: this.state.ratio,
            reason: this.state.note,
            terms: [
                {
                    type: 'STOCK',
                    code: this.state.symbol,
                    field: this.state.field,
                    relation: this.state.relation,
                    value: this.state.value * 1000
                }
            ]
        };

        vndsService.notiService().register(notiiData).then((res) => {
            console.log(res)
        }).then(console.log)
    }

    render () {

        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
                <ScrollView style={styles.container}>
                    <View style={styles.section} >
                        <Grid containerStyle={styles.gridContainer}>
                            <Row containerStyle={{marginLeft:0, justifyContent: 'flex-start'}}>
                                <Col>
                                    <FormInput inputStyle={styles.formInput} value={this.state.symbol}
                                               ref="symbol"
                                               onChangeText={(text)=> {this.autocomplete(text)}}
                                               onBlur={()=>{this.handleSelectedSymbol()}}
                                               onFocus={()=>{this.setState({isShowAutoComplete: true})}}
                                               placeholder="Mã CK" placeholderTextColor="#78B1AA">
                                    </FormInput>
                                </Col>
                                <Col>
                                    <FormLabel labelStyle={styles.labelText}>
                                        <Text>Giá khớp: </Text>
                                        <Text style={{color: this.state.priceColor, paddingLeft: Metrics.baseMargin}}> {this.state.matchPrice}</Text>
                                    </FormLabel>
                                </Col>
                            </Row>
                            <Row containerStyle={{marginLeft: 5}}>
                                <Col><FormLabel labelStyle={styles.labelSmall}>Điều kiện: </FormLabel></Col>
                            </Row>
                            <Row containerStyle={styles.rowContainer}>
                                <Col containerStyle={styles.containerSelect}>
                                    <Picker style={{width: 100}}
                                        selectedValue={this.state.field}
                                        onValueChange={this.onValueChange.bind(this, 'field')}>
                                        <Item label="Giá" value="matchedPrice" />
                                    </Picker>
                                </Col>
                                <Col containerStyle={styles.containerSelect}>
                                    <Picker style={{width: 80}}
                                            selectedValue={this.state.relation}
                                            onValueChange={this.onValueChange.bind(this, 'relation')}>
                                        <Item label=">=" value="GTEQ" />
                                        <Item label="<=" value="LTEQ" />
                                    </Picker>
                                </Col>
                                <Col>
                                    <FormInput inputStyle={styles.formInput}  placeholder="value"
                                               placeholderTextColor="#78B1AA" onChangeText={(text)=> {this.setState({value: text})}}/>
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
                                    <FormInput inputStyle={[styles.formInput, {width: Metrics.screenWidth}]}
                                               onChangeText={(text)=> {this.setState({note: text})}} placeholderTextColor="#78B1AA"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col containerStyle={{alignItems: 'center'}}>
                                    <Button buttonStyle={{width: 100, marginTop: 20}} backgroundColor="#18BA9C" borderRadius={5} title='Tạo Noti'
                                            onPress={() => {this.createNotiiime()}} />
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                </ScrollView>
                <AutoComplete callback={this.handleSelectedSymbol.bind(this)} visibility={this.state.isShowAutoComplete} stocks={this.state.data}/>
            </View>
        )
    }
}