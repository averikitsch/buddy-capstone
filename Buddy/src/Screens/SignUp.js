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

class SignUp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        email: '',
        error: null,
        confirm: false
    };
    this.userSignUp = this.userSignUp.bind(this);
    this.userConfirm = this.userConfirm.bind(this);
  }
  userSignUp (e) {
    e.preventDefault();
    Auth.signUp(this.state.username, this.state.password, this.state.email)
      .then((data) => {
        console.log(data)
        this.setState({
          confirm: true,
        })
      })
      .catch(err => console.log(err));
  }
  userConfirm(e) {
    e.preventDefault();
    this.setState({
      confirm: true,
    })
  }
  render () {
    let confirmButton = <Button onPress={this.userConfirm} title="Confirm User!"/>;
    if (this.state.confirm) {
      confirmButton = <ConfirmUser name={this.state.username} handleConfirm={this.props.onConfirm}/>
    }
    return (
        <View style={styles.container}>
            <Text>Sign Up Form</Text>
            <TextInput
                placeholder='Username'
                autoCapitalize='none'
                autoCorrect={false}
                autoFocus={true}
                keyboardType='email-address'
                value={this.state.username}
                onChangeText={(text) => this.setState({ username: text })} />
            <TextInput
                placeholder='Email'
                autoCapitalize='none'
                autoCorrect={false}
                autoFocus={true}
                keyboardType='email-address'
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })} />
            <TextInput
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })} />
            <View style={{margin: 7}}/>
            <Button onPress={this.userSignUp} title="Sign Up!"/>
            {confirmButton}
        </View>
    );
  }
}

class ConfirmUser extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        username: this.props.name,
        code: '',
    };
    // this.userSignUp = this.userSignUp.bind(this);
    this.userConfirm = this.userConfirm.bind(this);
  }
  userConfirm (e) {
    e.preventDefault();
    console.log(this.state.code)
    Auth.confirmSignUp(this.state.username, this.state.code.toString())
    .then((data) => {
      console.log(data)
      this.props.handleConfirm(e);
    })
    .catch(err => console.log(err));
  }
  render() {
    return (
      <View>
      <TextInput
          placeholder='Username'
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={true}
          keyboardType='email-address'
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })} />
      <TextInput
          placeholder='Code'
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={true}
          keyboardType='numeric'
          onChangeText={(text) => this.setState({ code: text })} />
      <Button onPress={this.userConfirm} title="Confirm"/>
      </View>
    )
  }
}

function mapStateToProps (store) {
  return {
      isLoggedIn: store.user.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      onSignUp: (username, password) => { dispatch(signup(username, password)); }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
