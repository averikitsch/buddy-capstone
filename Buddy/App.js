import React from 'react';
// import { StyleSheet, Text, View, StyleProvider } from 'react-native';

import Amplify, { withAuthenticator, Storage } from 'aws-amplify-react-native';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);


import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import store from './src/store';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import Loading from './src/Screens/Loading';
import StackLoginNav from './src/Screens/StackLoginNav';
import Navigator from './src/Screens/TabNavigator';
// import {connect} from 'react-redux';
import { fetchStrains } from './src/Actions/index';



class Buddy extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    }
    this.handleReady = this.handleReady.bind(this);
  }
  handleReady() {
    console.log('ready')
    // this.setState({
    //   isReady: true
    // })
  }
  componentDidMount() {
    axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/search/all`)
      .then((response) => {
        const names = Object.keys(response.data);
        console.log('names', names);
        this.setState({isReady: true})
        store.dispatch(fetchStrains(names))
      })

    persistStore(store,
      {
        storage: AsyncStorage,
      },
      () => this.handleReady
    )
  }
  render() {
    if (!this.state.isReady) {
      return (
        <Loading />
      )
    }
    return (
      <Provider store={store}>
        <StackLoginNav />
      </Provider>
    );
  }
}

export default Buddy;
