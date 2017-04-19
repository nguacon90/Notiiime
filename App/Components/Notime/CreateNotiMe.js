/**
 * Created by minh on 16/04/2017.
 */
import React from "react";
import {AsyncStorage, Keyboard, Picker, ScrollView, Text, View} from "react-native";
import {Colors, Metrics} from "../../Themes/";
import styles from "../../Containers/Styles/LaunchScreenStyles";
import {Button, Col, FormInput, FormLabel, Grid, Icon, Row} from "react-native-elements";
import vndsService from "../../Services/VndsService";
import AutoComplete from "../Autocomplete/AutoComplete";
import Constants from "../../Config/Constants";
import {Actions} from "react-native-router-flux";
const Item = Picker.Item;
import DatePicker from 'react-native-datepicker'
export default class NotiMe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            symbol: '',
            matchPrice: '',
            priceColor: Colors.transparent,
            terms: [
                {
                    type: 'STOCK',
                    field: 'matchedPrice',
                    relation: 'GTEQ',
                    value: '',
                    logical: 'AND'
                }
            ],
            note: '',
            expiredDate: '',
            stocks: [],
            data: [],
            isShowAutoComplete: false
        };
    }
    componentDidMount() {
        this.getUserId();
        if(this.state.stocks.length == 0) {
            var self = this;
            vndsService.finfoService().getStocks().then((res) => {
                if(res.data) {
                    var stocks = [];
                    res.data.data.map((stock) => {
                       stocks.push({
                           symbol: stock.symbol,
                           companyName: stock.companyName
                       })
                    });
                    self.setState({stocks: stocks});
                }
            });
        }
    }

    async getUserId() {
        var userInfo = await AsyncStorage.getItem(Constants.accessToken)
        if (typeof userInfo === 'string') {
            var userModel = JSON.parse(userInfo);
            this.setState({
                userId: userModel.userID
            })
        }
    }

    autocomplete(text) {
        this.setState({
            isShowAutoComplete: true
        });

        var data = this.state.stocks.filter(stock => stock.symbol.toUpperCase().startsWith(text.toUpperCase()));

        this.setState({
            data: data,
            symbol: text
        });
    }

    onValueChange = (key: string, index, value: string) => {
        const terms = this.state.terms;
        terms[index][key] = value;
        this.setState({terms:terms});
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
        if(this.state.userId == '' || typeof (this.state.userId) == 'undefined') {
            alert('Bạn cần login để sử dụng tính năng này')
            return;
        }

        this.props.showLoading(true);
        var self = this;
        var notiiData = {
            expiredDate: this.state.expiredDate,
            reason: this.state.note,
            symbol: this.state.symbol,
            userID: this.state.userId,
            terms: this.state.terms
        };

        vndsService.notiService().register(notiiData).then((res) => {
            self.props.showLoading(false);
            console.log(res);
            if(res.ok) {
                Actions.notime();
            } else {
                alert(res.problem);
            }
        })
        .catch((err) =>{
            alert(err);
            self.props.showLoading(false);
        })
    }

    setValue(value, index) {
        var terms = this.state.terms;
        terms[index].value = value;
        this.setState({
            terms: terms
        });
    }
    removeTerm(index) {
        var terms = this.state.terms;
        terms.splice(index, 1);
        this.setState({terms:terms});
    }

    renderTerms() {
        return this.state.terms.map(function(term, index){
            if(index == 0) {
                return (
                    <Row containerStyle={styles.rowContainer} key={index}>
                        <Col containerStyle={styles.columnContainer}>
                            <Picker style={{width: 120, flex: 1, alignItems: 'flex-start', padding: 0, margin: 0}}
                                    selectedValue={this.state.terms[index].field}
                                    onValueChange={this.onValueChange.bind(this, 'field', index)}>
                                <Item label="Giá" value="matchedPrice" />
                                <Item label="Khối lượng" value="quantity" />
                            </Picker>
                        </Col>
                        <Col containerStyle={styles.columnContainer}>
                            <Picker style={{width: 60, marginLeft: 40, marginRight: 10, alignItems: 'flex-start'}}
                                    selectedValue={this.state.terms[index].relation}
                                    onValueChange={this.onValueChange.bind(this, 'relation', index)}>
                                <Item label=">=" value="GTEQ" />
                                <Item label="<=" value="LTEQ" />
                            </Picker>
                        </Col>
                        <Col containerStyle={styles.columnContainer}>
                            <FormInput underlineColorAndroid={Colors.transparent}
                                       containerStyle={{marginLeft: 0, paddingLeft: 30}}
                                       inputStyle={[styles.formInput, {}]}  placeholder="value"
                                       placeholderTextColor="#78B1AA"
                                       onChangeText={(text)=> {this.setValue.bind(this, text, index)}}/>
                        </Col>
                        <Col containerStyle={styles.removeIconContainer}>
                        </Col>
                    </Row>
                )
            } else {
                return (
                    <Row containerStyle={styles.rowContainer} key={index}>
                        <Col containerStyle={styles.columnContainer}>
                            <Picker style={{width: 120, flex: 1, alignItems: 'flex-start', padding: 0, margin: 0}}
                                    selectedValue={this.state.terms[index].field}
                                    itemStyle={{padding: 0}}
                                    onValueChange={this.onValueChange.bind(this, 'field', index)}>
                                <Item label="Giá" value="matchedPrice" />
                                <Item label="Khối lượng" value="quantity" />
                            </Picker>
                        </Col>
                        <Col containerStyle={styles.columnContainer}>
                            <Picker style={{width: 60, marginLeft: 40, marginRight: 10, alignItems: 'flex-start'}}
                                    selectedValue={this.state.terms[index].relation}
                                    onValueChange={this.onValueChange.bind(this, 'relation', index)}>
                                <Item label=">=" value="GTEQ" />
                                <Item label="<=" value="LTEQ" />
                            </Picker>
                        </Col>
                        <Col containerStyle={styles.columnContainer}>
                            <FormInput underlineColorAndroid={Colors.transparent}
                                       containerStyle={{marginLeft: 0, paddingLeft: 30}}
                                       inputStyle={[styles.formInput]}  placeholder="value"
                                       placeholderTextColor="#78B1AA"
                                       onChangeText={(text)=> {this.setValue.bind(this, text, index)}}/>
                        </Col>
                        <Col containerStyle={styles.removeIconContainer}>
                            <Icon type="font-awesome" name="minus-circle" color={Colors.defaultText}
                                    onPress={this.removeTerm.bind(this, index)}/>
                        </Col>
                    </Row>
                );
            }
        }.bind(this))
    }
    addTerms() {
        var terms = this.state.terms;
        terms.push({
            type: 'STOCK',
            field: 'matchedPrice',
            relation: 'GTEQ',
            value: '',
            logical: 'AND'
        });
        this.setState({terms:terms});
    }

    render () {
        const terms = this.renderTerms();
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={[styles.container, styles.scrollViewContainer]}>
                    <View style={styles.section} >
                        <Grid containerStyle={styles.gridContainer}>
                            <Row containerStyle={{marginLeft:0, justifyContent: 'flex-start'}}>
                                <Col>
                                    <FormInput containerStyle={{marginRight: 0, marginLeft: 0}}
                                               inputStyle={[styles.formInput, {flex: 1, alignItems: 'flex-start', width: 80,
                                        fontSize: 18, color: Colors.defaultText, fontWeight: 'bold'}]}
                                               value={this.state.symbol}
                                               ref="symbol"
                                               underlineColorAndroid={Colors.defaultText}
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
                            <Row containerStyle={[{marginLeft: 5}, styles.rowContainer]}>
                                <Col><FormLabel labelStyle={styles.labelSmall}>Điều kiện: </FormLabel></Col>
                            </Row>

                            {terms}

                            <Row containerStyle={styles.rowContainer}>
                                <Col containerStyle={{justifyContent: 'center', width: 30}} onPress={this.addTerms.bind(this)}>
                                    <Icon raised={false} name='plus-circle' type='font-awesome'
                                          color={Colors.defaultText}
                                          underlayColor="transparent" size={18}
                                          reverseColor="transparent"/>
                                </Col>
                                <Col containerStyle={{alignItems: 'flex-start', marginBottom: 10}} onPress={this.addTerms.bind(this)}>
                                    <FormLabel labelStyle={styles.labelText}>Thêm</FormLabel>
                                </Col>
                            </Row>
                            <Row containerStyle={styles.rowContainer}>
                                <Col><FormLabel labelStyle={[styles.labelSmall, {width: 200}]}>Ngày hết hạn: </FormLabel></Col>
                                <Col containerStyle={styles.containerSelect}>
                                    <DatePicker
                                        style={{width: 150}}
                                        date={this.state.expiredDate}
                                        mode="date"
                                        placeholder="Chọn ngày"
                                        format="YYYY-MM-DD"
                                        minDate={new Date()}
                                        maxDate="2030-06-01"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        showIcon={false}
                                        androidMode={'default'}
                                        customStyles={{
                                            dateInput: {
                                                borderWidth: 0
                                            }
                                        }}
                                        onDateChange={(date) => {this.setState({expiredDate: date})}}
                                    />
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