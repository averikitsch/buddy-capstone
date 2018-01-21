import React from 'react';
import { ScrollView, Text, TextInput, View, Button, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
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
    let confirmButton = (<TouchableHighlight onPress={this.userConfirm} style={styles.Button}>
      <Text style={[styles.label, {fontSize: 18}]}>Confirm User</Text>
    </TouchableHighlight>);

    if (this.state.confirm) {
      confirmButton = <ConfirmUser name={this.state.username} handleConfirm={this.props.onConfirm}/>
    }
    return (
        <View style={styles.container}>
            <Text style={styles.label}>START A NEW JOURNAL</Text>
            <TextInput
                placeholder='Username'
                autoCapitalize='none'
                autoCorrect={false}
                autoFocus={true}
                keyboardType='email-address'
                value={this.state.username}
                onChangeText={(text) => this.setState({ username: text })}
                style={styles.textInput}/>
            <TextInput
                placeholder='Email'
                autoCapitalize='none'
                autoCorrect={false}
                autoFocus={true}
                keyboardType='email-address'
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
                style={styles.textInput}/>
            <TextInput
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
                style={styles.textInput}/>
            <View style={{margin: 7}}/>
            <TouchableHighlight onPress={this.userSignUp} style={styles.Button}>
              <Text style={[styles.label, {fontSize: 18}]}>Sign Up</Text>
            </TouchableHighlight>
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
      <View style={styles.container}>
      <TextInput
          placeholder='Username'
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={true}
          keyboardType='email-address'
          value={this.state.username}
          onChangeText={(text) => this.setState({ username: text })}
          style={styles.textInput}/>
      <TextInput
          placeholder='Code'
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={true}
          keyboardType='numeric'
          onChangeText={(text) => this.setState({ code: text })}
          style={styles.textInput}/>
          <TouchableHighlight onPress={this.userConfirm} style={styles.Button}>
            <Text style={[styles.label, {fontSize: 18}]}>Start</Text>
          </TouchableHighlight>
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
  },
  label: {
    fontFamily: 'Crete Round',
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  textInput: {
    borderBottomColor: colors.darkGray,
    borderBottomWidth: 1,
    fontSize: 26,
    fontFamily: 'Josefin Sans',
    color: colors.darkGray,
    width: Dimensions.get("window").width * .75,
    marginTop: 30,
  },
  Button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: colors.darkGray,
    borderWidth: 2,
    marginBottom: 20,
    marginTop: 10,
  },
});
