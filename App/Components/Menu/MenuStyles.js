/**
 * Created by minh on 16/04/2017.
 */
import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightBackground,
    },

    containerMenu: {
        borderRightWidth: 0.3,
        borderRightColor: Colors.gray
    },

    title: {
        paddingTop: Metrics.doubleBaseMargin,
        paddingLeft: Metrics.baseMargin,
        backgroundColor: Colors.background,
        height: 54,
        margin: 0,
        paddingBottom: 0,
    },
    username: {
        color: Colors.snow,
        fontWeight: Fonts.weight.bold,

    },
    item: {
        marginTop: 0,
        backgroundColor: Colors.lightBackground,
        borderBottomWidth: 0.8,
        borderBottomColor: Colors.background
    },
    itemTitle: {
        color: Colors.defaultText
    },
    listContainer: {
        marginTop: 0,
        borderBottomWidth: 0
    }
})