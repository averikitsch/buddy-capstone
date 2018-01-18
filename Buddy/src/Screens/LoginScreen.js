import React from 'react';
import { ScrollView, Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Amplify, { Auth } from 'aws-amplify-react-native';
import aws_exports from '../aws-exports';
Amplify.configure(aws_exports);
import { login } from '../Actions';
import Navigator from './TabNavigator';
import { colors, sharedStyles } from '../assets/Theme';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import Login from './Login';
import SignUp from './SignUp';

class LoginScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        route: 'Login',
    };
  }
  toggleRoute (e) {
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    console.log(this.state.route)
    this.setState({ route: alt });
    e.preventDefault();
  }
  render () {
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    if (this.state.route === 'Login') {
      return (
          <View style={styles.container}>
            <Login navigation={this.props.navigation}/>
              <Text onPress={(e) => this.toggleRoute(e)}>
                {alt}
              </Text>
          </View>
      )
    } else {
      return (
          <View style={styles.container}>
            <SignUp
              navigation={this.props.navigation}
              onConfirm={(e) => this.toggleRoute(e)}/>
            <Text onPress={(e) => this.toggleRoute(e)}>
              {alt}
            </Text>
          </View>
      )
    }
  }
}


function mapStateToProps (store) {
  return {
      isLoggedIn: store.user.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onLogin: (username, password) => { dispatch(login(username, password)); },
      onSignUp: (username, password) => { dispatch(signup(username, password)); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
