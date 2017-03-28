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
        borderWidth: 0
    },
    containerSelect: {
        flex: 1,
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems: 'flex-start',
        marginLeft: Metrics.widths.small,
        justifyContent: 'center'
    },
    containerInput: {
        borderBottomColor: Colors.background,
    },

    labelText: {
        color: Colors.black,
        fontSize: Fonts.size.label,
        fontFamily: Fonts.type.Roboto,
        fontWeight: Fonts.weight.light,
        marginTop: Metrics.mediumMargin
    },
    labelSmall: {
        color: Colors.defaultText,
        fontSize: Fonts.size.label,
        fontFamily: Fonts.type.Roboto,
        fontWeight: Fonts.weight.light,
        marginTop: Metrics.baseMargin,
        width: Metrics.widths.normal,
    }
})
