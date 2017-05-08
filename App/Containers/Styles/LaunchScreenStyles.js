import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    scrollViewContainer: {
      marginBottom: Metrics.doubleSection
    },
    logo: {
        marginTop: Metrics.doubleSection,
        height: Metrics.images.logo,
        width: Metrics.images.logo,
        resizeMode: 'contain'
    },
    stockNotiContainer: {
        marginLeft: Metrics.baseMargin,
        marginRight: Metrics.baseMargin
    },
    containerCenter: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    sectionCenter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:'center',
        marginBottom: Metrics.doubleBaseMargin
    },
    btnDefault: {
        width: Metrics.widths.large,
        borderRadius: 5,
        backgroundColor: Colors.background
    },
    iconNoti: {
        color: Colors.basicColor
    },
    textNoti: {
        color: Colors.defaultText,
        fontSize: Fonts.size.h4,
        marginLeft: Metrics.baseMargin
    },
    iconAddNoti: {
        fontSize: Fonts.size.regular,
        color: Colors.defaultText
    },
    centered: {
        textAlign: "center"
    },
    whiteColor: {
        color: Colors.text
    },
    formInput: {
        color: Colors.black,
        fontSize: Fonts.size.medium,
        fontWeight: Fonts.weight.light,
        fontFamily: Fonts.type.Roboto,
        borderWidth: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingRight: 10,
        alignItems: 'flex-start',
        flex: 1,
    },
    columnContainer: {
        marginLeft: 0,
        padding: 0,
    },
    containerInput: {
        borderBottomColor: Colors.background,
        marginLeft: 5,
        paddingLeft: 0,
    },
    gridContainer: {
        marginLeft: 5,
        marginRight: 5
    },

    labelText: {
        color: Colors.black,
        fontSize: Fonts.size.label,
        fontFamily: Fonts.type.Roboto,
        fontWeight: Fonts.weight.light,
        marginTop: Metrics.mediumMargin,
        marginLeft: 0
    },
    subtitleLabelText: {
        color: Colors.gray,
        fontSize: Fonts.size.medium,
        fontFamily: Fonts.type.Roboto,
        fontWeight: Fonts.weight.light,
        marginLeft: 0
    },
    labelSmall: {
        color: Colors.defaultText,
        fontSize: Fonts.size.label,
        fontFamily: Fonts.type.Roboto,
        fontWeight: Fonts.weight.light,
        marginTop: Metrics.mediumMargin,
        width: Metrics.widths.normal,
        marginLeft: 2
    },
    rowContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.text,
        marginLeft: 5,
        paddingTop: 3,
        paddingBottom: 3,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center'
    },
    tabBarWithNav: {
        marginTop: Metrics.navBarHeight,
        height: Metrics.heights.small
    },
    tabBarView: {
        backgroundColor: Colors.lightBackground,
    },
    titleTextDefault: {
        color: Colors.black,
        fontSize: Fonts.size.regular,
        paddingBottom: 7,
        alignSelf: 'center'
    },
    selectedTitle: {
        color: Colors.defaultText,
        fontWeight: Fonts.weight.bold,
        borderBottomColor: Colors.background,
        borderBottomWidth: 0.8,
        width: Metrics.widths.large
    },
    scenseTabContent: {
        flex: 1,
        flexDirection: 'row',
        height: Metrics.screenHeight,
    },
    listViewRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: "center",
        paddingTop: 5,
        paddingBottom: 15,
    },
    pickerGroup: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        padding: 0
    },
    pickerItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
    }
})
