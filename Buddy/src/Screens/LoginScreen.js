/* eslint-disable */
import React from 'react';
import { AppRegistry, View, StatusBar } from 'react-native';
import { Container, Body, Content, Left, Right, Icon, Title, Input, Item, Label, Button, Text } from 'native-base';
import Header from '../Components/HeaderComponent';

class LoginScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header />
        <Content padder>
        <Text> Explore Screen </Text>
        </Content>
      </Container>
    );
  }
}

export default LoginScreen
