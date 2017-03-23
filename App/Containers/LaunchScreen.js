import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import Login from './LoginFacebook'
import {Actions} from 'react-native-router-flux'
// Styles
import styles from './Styles/LaunchScreenStyles'


export default class LaunchScreen extends React.Component {

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={styles.sectionText} onPress={() => Actions.notiiimeHome()}>
              {'Go to notiii.me.'}
            </Text>
          </View>
          <View style={styles.centered}>
            <Login />
          </View>
        </ScrollView>
      </View>
    )
  }
}
