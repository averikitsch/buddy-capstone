import React from 'react';
import { ScrollView, Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import Amplify, { Auth } from 'aws-amplify-react-native';
import aws_exports from '../../aws-exports';
Amplify.configure(aws_exports);
import { login } from '../Actions';
import Navigator from './TabNavigator';
import { colors, sharedStyles } from '../assets/Theme';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        route: 'Login',
        username: 'averik',
        password: 'Momlis33!',
        email: '',
        error: null,
    };
    this.userLogin = this.userLogin.bind(this);
  }
  userLogin (e) {
    e.preventDefault();
    if (this.state.route === 'Login') {
      Auth.signIn(this.state.username, this.state.password)
        .then((user) => {
          this.props.onLogin(this.state.username, this.state.password);
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Tabs' }),
            ],
          });
          this.props.navigation.dispatch(resetAction);
        })
        .catch(err => console.log(err));
    } else {
      Auth.signUp(this.state.username, this.state.password, this.state.email)
        .then((data) => console.log(data))
        .catch(err => console.log(err));
    }
  }

  toggleRoute (e) {
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    this.setState({ route: alt });
    e.preventDefault();
  }

  render () {
    let alt = (this.state.route === 'Login') ? 'SignUp' : 'Login';
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 27}}>{this.state.route}</Text>
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
            <Button onPress={this.userLogin} title={this.state.route}/>
            <Text style={{fontSize: 16, color: 'blue'}} onPress={(e) => this.toggleRoute(e)}>{alt}</Text>
            <Text>{this.state.error}</Text>
        </View>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
