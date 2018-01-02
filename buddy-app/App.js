import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { Font, AppLoading } from 'expo';
import store from './app/redux/store';
import Router from './app/config/routes';
// AWS IMPORTS
import Amplify from 'aws-amplify-react-native';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

// async componentWillMount() {
//   await Font.loadAsync({
//     'Roboto': require('native-base/Fonts/Roboto.ttf'),
//     'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
//     'Pacifico': require('./app/assets/fonts/Pacifico.ttf'),
//     'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
//   });
// }


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Changes you make will automatically reload.</Text>
      <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
