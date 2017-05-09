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
    textAppName: {
        fontSize: Fonts.size.regular,
        color: Colors.snow
    },
    containerMenu: {
        borderRightWidth: 0.3,
        borderRightColor: Colors.gray,
    },

    appTitle: {
        backgroundColor: Colors.background,
        height: 45,
        margin: 0,
        paddingBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    username: {
        color: Colors.snow,
        fontWeight: Fonts.weight.bold,

    },
    item: {
        marginTop: 0,
        marginLeft: 7,
        backgroundColor: Colors.snow,
    },
    firstListContainer: {
        marginTop: 0,
    },
    itemAccount: {
        height: 60,
        marginLeft: 0,
        marginRight: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemTitle: {
        color: Colors.charcoal,
        marginLeft: 5
    },
    listContainer: {
        marginTop: Metrics.doubleBaseMargin,
    }
})