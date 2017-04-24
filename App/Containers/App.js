import React, {Component} from "react";
import RootContainer from "./RootContainer";
import { FormattedWrapper } from 'react-native-globalize';
/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */

class App extends Component {
  render () {
    return (
        <FormattedWrapper locale={"en"}>
          <RootContainer />
        </FormattedWrapper>
    )
  }
}

export default App
