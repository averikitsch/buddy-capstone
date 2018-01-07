import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Amplify, { withAuthenticator, Storage } from 'aws-amplify-react-native';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

import TrackForm from './src/Screens/Track'

class App extends React.Component {
  render() {
    return (
      <TrackForm />
    );
  }
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
