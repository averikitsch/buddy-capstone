import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

// AWS
import Amplify from 'aws-amplify-react-native';
import aws_exports from './src/aws-exports';
Amplify.configure(aws_exports);

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './src/store'
let { store, persistor } = configureStore()

// Actions
import axios from 'axios';
import { fetchStrains } from './src/Actions/index';

// Screens
import Loading from './src/Screens/Loading';
import StackLoginNav from './src/Screens/StackLoginNav';
import Navigator from './src/Screens/TabNavigator';

class Buddy extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    }
  }
  componentDidMount() {
    axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/search/all`)
      .then((response) => {
        const names = Object.keys(response.data);
        this.setState({isReady: true})
        store.dispatch(fetchStrains(names))
      })
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
    )
  }
}

export default Buddy;
