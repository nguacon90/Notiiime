import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    logo: {
        marginTop: Metrics.doubleSection,
        height: Metrics.images.logo,
        width: Metrics.images.logo,
        resizeMode: 'contain'
    },
    centered: {
        alignItems: 'center'
    },
    whiteColor: {
        color: Colors.text
    },
    formInput: {
        color: Colors.black,
        fontSize: Fonts.size.medium,
        fontWeight: Fonts.weight.light,
        width: Metrics.widths.medium,
        fontFamily: Fonts.type.Roboto,
        borderWidth: 0,
        marginLeft: 0,
        marginRight: 0,
    },
    containerSelect: {
        marginLeft: 0,

    },
    containerInput: {
        borderBottomColor: Colors.background,
        marginLeft: 5,
        paddingLeft: 0,
    },
    gridContainer: {
        marginLeft: 0,
        marginRight: 1
    },

    labelText: {
        color: Colors.black,
        fontSize: Fonts.size.label,
        fontFamily: Fonts.type.Roboto,
        fontWeight: Fonts.weight.light,
        marginTop: Metrics.mediumMargin,
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
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'flex-start'
    }
})
