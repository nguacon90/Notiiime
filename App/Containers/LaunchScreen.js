import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import Login from './LoginFacebook'
// Styles
import styles from './Styles/LaunchScreenStyles'


export default class LaunchScreen extends React.Component {

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            <Text style={styles.sectionText}>
              {'Welcome to notiii.me.'}
            </Text>
          </View>
          <View style={styles.section} >
            <Text style={styles.sectionText}>
              {'Login with facebook.'}
            </Text>
            <Login />
          </View>
        </ScrollView>
      </View>
    )
  }
}
