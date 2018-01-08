/*eslint-disable*/
import React from 'react';
import { AppRegistry, View, StatusBar, Image, StyleSheet } from 'react-native';
import { Container, Body, Content, Header, Left, Right, Title, Input, Item, Label, Button, Text } from 'native-base';

export default class HeaderComponent extends React.Component {
  render() {
    if (this.props.name) {
      return (
        <Header style={styles.navbar}>
        <Title style={styles.navbarHeader}>{this.props.name.toUpperCase()}</Title>
        </Header>
      )
    } else {
      return (
        <Header style={styles.navbar}>
        <Title style={styles.navbarHeader}>{"Buddy".toUpperCase()}</Title>
        </Header>
      )
    }
  }
}

const styles = StyleSheet.create({
  navbar: {
    paddingTop: 30,
  },
  navbarHeader: {
    fontFamily: 'Crete Round',
    fontSize: 24,
  },
});
