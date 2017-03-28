import React from "react";
import {Image, ScrollView, View, Text, } from "react-native";
import {Images} from "../Themes";
import styles from "./Styles/LaunchScreenStyles";
import {Col, FormInput, FormLabel, Grid, Row} from "react-native-elements";
import ModalPicker from '../Components/ModelPicker/index';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class NotiMeHome extends React.Component {
    constructor() {
        super();

        this.state = {
            conditionValue: ' ',
            operatorValue: ' '
        }
    }
    render () {
        const conditions = [
            {key: "price" , label: 'Giá'},
            {key: "market" , label: 'Thị trường'},
        ];

        const operators = [
            {key: "gteq" , label: '>='},
            {key: "lteq" , label: '<='},
        ];


        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
                <ScrollView style={styles.container}>
                    <View style={styles.section} >
                        <Grid>
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
                            <Row>
                                <Col><FormLabel labelStyle={styles.labelSmall}>Điều kiện: </FormLabel></Col>
                                <Col containerStyle={styles.containerSelect}>
                                    <ModalPicker selectStyle={{width: 150, "flexDirection": "column",flexDirection:'row',
                                        flexWrap:'wrap',alignItems: 'flex-start',}}
                                        data={conditions}
                                        initValue=""
                                                 onChange={(option)=>{this.setState({conditionValue:option.label})}}>
                                            <Text style={{paddingLeft:10, paddingTop:10, width: 80, "flexDirection": "column"}}>{this.state.conditionValue} </Text>
                                            <Icon name="sort-down" style={{paddingLeft:10, "flexDirection": "column"}}/>
                                    </ModalPicker>
                                </Col>
                                <Col containerStyle={styles.containerSelect}>
                                    <ModalPicker selectStyle={{"flexDirection": "column", width: 50}}
                                        data={operators}
                                        initValue=""
                                        onChange={(option)=>{this.setState({operatorValue:option.label})}}>
                                        <Text style={{paddingLeft:20, paddingTop:10,  width: 100}}>
                                            <Text style={{width: 50}}>{this.state.operatorValue}</Text> <Icon name="sort-down" style={{"flexDirection": "column"}}/>
                                        </Text>
                                    </ModalPicker>
                                </Col>
                                <Col>
                                    <FormInput inputStyle={styles.formInput} textInputRef="value" placeholder="value" placeholderTextColor="#78B1AA"/>
                                </Col>
                            </Row>
                        </Grid>
                    </View>
                </ScrollView>
            </View>
        )
    }
}