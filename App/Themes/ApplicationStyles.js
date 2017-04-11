import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent,
        padding: 0,
        margin: 0
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.doubleBaseMargin,
      backgroundColor: Colors.transparent,
        paddingLeft: 0
    },
    section: {
      marginTop: Metrics.section,
      marginBottom: Metrics.section,
      marginRight: Metrics.smallMargin,
      paddingTop: Metrics.smallMargin,
        marginLeft: 1
    },
    sectionText: {
      ...Fonts.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.black,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.h2,
      fontSize: 14,
      color: Colors.text
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  },

    autocompleteView: {
        backgroundColor: Colors.background,
    },
    defaultText: {
        height: Metrics.heights.medium,
        color: Colors.snow,
        paddingLeft: Metrics.doubleBaseMargin,
        paddingRight: Metrics.doubleBaseMargin,
        paddingTop: Metrics.baseMargin,
        paddingBottom: Metrics.baseMargin,
        borderRightWidth: 1,
        borderColor: Colors.snow,
        fontSize: Fonts.size.medium,
        lineHeight: Metrics.heights.small
    }
}

export default ApplicationStyles
