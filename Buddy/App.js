import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Amplify, { withAuthenticator, Storage } from 'aws-amplify-react-native';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
import { TabNavigator, StackNavigator } from "react-navigation";
import { Button, Footer, FooterTab } from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';

import Navigator from "./src/Navigator";

export default class Buddy extends React.Component {
  constructor() {
    super();
  }
  render() {
    return <Navigator />;
  }
}

// export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
