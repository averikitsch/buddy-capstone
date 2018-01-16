import React from 'react';
import { StyleSheet, Text, View, StyleProvider } from 'react-native';
// import Amplify, { withAuthenticator, Storage } from 'aws-amplify-react-native';
// import aws_exports from './aws-exports';
// Amplify.configure(aws_exports);
import { TabNavigator, StackNavigator } from 'react-navigation';
// import { Button, Footer, FooterTab } from 'native-base';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import store from './src/store';
import axios from 'axios';
import Navigator from './src/Navigator';
// import {connect} from 'react-redux';
import { fetchStrains } from './src/Actions/index';



export default class Buddy extends React.Component {
  constructor() {
    super();
    axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/search/all`)
      .then((response) => {
        const names = Object.keys(response.data);
        console.log('names', names);
        store.dispatch(fetchStrains(names))
      })
  }
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
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
