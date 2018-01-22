import React from 'react';
// import { StyleSheet, Text, View, StyleProvider } from 'react-native';

import Amplify from 'aws-amplify-react-native';
import aws_exports from './src/aws-exports';
Amplify.configure(aws_exports);

// Amplify.configure({
//   Auth: {
//       identityPoolId: 'us-west-2:5f8350eb-7c9a-41ed-b437-9d8b421faf0c', //REQUIRED - Amazon Cognito Identity Pool ID
//       region: 'us-west-2', // REQUIRED - Amazon Cognito Region
//       userPoolId: 'us-west-2_7WaS5h0h7', //OPTIONAL - Amazon Cognito User Pool ID
//       userPoolWebClientId: 'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito Web Client ID
//   },
//   Analytics: {
//       appId: '6343581b8237443a829901b82d540401', //OPTIONAL -  Amazon Pinpoint App ID
//       region: 'us-east-1', //OPTIONAL -  Amazon service region
//   }
// });
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './src/store'
let { store, persistor } = configureStore()

// import { AsyncStorage } from 'react-native';
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
    // Amplify.configure(aws_exports);
    // Amplify.configure({
    //   Auth: {
    //       identityPoolId: 'us-west-2:5f8350eb-7c9a-41ed-b437-9d8b421faf0c', //REQUIRED - Amazon Cognito Identity Pool ID
    //       region: 'us-west-2', // REQUIRED - Amazon Cognito Region
    //       userPoolId: 'us-west-2_7WaS5h0h7', //OPTIONAL - Amazon Cognito User Pool ID
    //       userPoolWebClientId: 'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito Web Client ID
    //   },
    //   Analytics: {
    //       appId: '6343581b8237443a829901b82d540401', //OPTIONAL -  Amazon Pinpoint App ID
    //       region: 'us-east-1', //OPTIONAL -  Amazon service region
    //   }
    // });

    axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/search/all`)
      .then((response) => {
        const names = Object.keys(response.data);
        // console.log('names', names);
        this.setState({isReady: true})
        store.dispatch(fetchStrains(names))
      })

    // persistStore(store,
    //   {
    //     storage: AsyncStorage,
    //   },
    //   () => this.handleReady
    // )
  }
  render() {
    if (!this.state.isReady) {
      return (
        <Loading />
      )
    }
    return (
      <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <StackLoginNav />
      </PersistGate>
      </Provider>
    );
  }
}

export default Buddy;
