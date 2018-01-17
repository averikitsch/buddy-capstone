import React from 'react';
// import { StyleSheet, Text, View, StyleProvider } from 'react-native';

import Amplify, { withAuthenticator, Storage } from 'aws-amplify-react-native';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './src/store';
import axios from 'axios';
import StackLoginNav from './src/Screens/StackLoginNav'
import Navigator from './src/Screens/TabNavigator';
// import {connect} from 'react-redux';
import { fetchStrains } from './src/Actions/index';



class Buddy extends React.Component {
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
        <StackLoginNav />
      </Provider>
    );
  }
}

export default Buddy;
