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
import axios from 'axios';

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
        const userId = user.pool.clientId;
        const provider = "amazon";
        const url = `https://buddy-backend.herokuapp.com/users/provider/${provider}`;
        axios.post(url, {userId: userId})
          .then((user) => {
            let logId = user.data._id;
            let data = {
              logs: user.data.LogList,
              wishlist: user.data.WishList
            }
            if (user.id) {
              this.props.onLogin(this.state.username, userId, logId, data)
            } else {
              axios.post('https://buddy-backend.herokuapp.com/users',{
                username: this.state.username,
                userId: userId,
              })
              .then((user) => {
                console.log(user)
                console.log(user)
                logId = user.data._id
                data = {}
                this.props.onLogin(this.state.username, userId, logId, data)
              })
              .catch(err => console.log(err))
            }
          })
          .catch(err => console.log(err))
          this.navigate2tabs();
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
      this.navigate2tabs();

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
      onLogin: (username, userId, logId, data) => { dispatch(login(username, userId, logId, data)); },
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
