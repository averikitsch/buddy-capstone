import React from 'react';
import { ScrollView, Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Amplify, { Auth, API } from 'aws-amplify-react-native';
import aws_exports from '../aws-exports';
Amplify.configure(aws_exports);
import { login, signup } from '../Actions';
import Navigator from './TabNavigator';
import { colors, sharedStyles } from '../assets/Theme';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        username: 'averik',
        password: 'Momlis33!',
        error: null,
    };
    this.userLogin = this.userLogin.bind(this);
  }
  userLogin (e) {
    e.preventDefault();
    Auth.signIn(this.state.username, this.state.password)
      .then((user) => {
        console.log(user)
        const apiName = 'UsersCRUD';
        const userId = user.pool.clientId;
        console.log(userId)
        let path = `/Users/${userId}`;
        API.get(apiName, path)
          .then((response) => {
            console.log(response)
            this.props.onLogin(this.state.username, userId, response );
            this.navigate2tabs();
          })
          .catch((err) => {
            console.log('api error', err)
            let myInit ={
              body:{ UserId: userId }
            }
            let path = `/Users/`;
            API.post(apiName, path, myInit)
              .then((response) => {
                console.log('post', response);
                this.props.onLogin(this.state.username, userId, {logs: [], wishlist: []} );
                this.navigate2tabs();
              })
              .catch((err) => {
                console.log('err', err)
              })
            // this.props.onSignUp(this.state.username, userId );
            // this.navigate2tabs();
          })

      })
      .catch(err => console.log(err));
  }
  navigate2tabs () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Tabs' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }
  render () {
    if (this.props.isLoggedIn) {
      console.log('logged in')
      // console.log(this.props.navigation)
      this.navigate2tabs();
      // return (
      //   <Navigator />
      // )
    }
    return (
        <View style={styles.container}>
            <Text>Login Please</Text>
            <TextInput
                placeholder='Username'
                autoCapitalize='none'
                autoCorrect={false}
                autoFocus={true}
                keyboardType='email-address'
                value={this.state.username}
                onChangeText={(text) => this.setState({ username: text })} />
            <TextInput
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })} />
            <View style={{margin: 7}}/>
            <Button onPress={this.userLogin} title='Login Now!'/>
        </View>
    );
  }
}


function mapStateToProps (store) {
  return {
      isLoggedIn: store.user.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onLogin: (username, userId, response) => { dispatch(login(username, userId, response)); },
      onSignUp: (username, userId) => {
        dispatch(signup(username, userId))
      },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
