/*eslint-disable*/
import React from 'react';
import { AppRegistry, View, StatusBar, Image, StyleSheet } from 'react-native';
import { Container, Body, Content, Header, Left, Right, Title, Input, Item, Label, Button, Text } from 'native-base';
import { colors } from '../assets/Theme';

export default class HeaderComponent extends React.Component {
  render() {
    if (this.props.name) {
      return (
        <Header style={styles.navbar} iosBarStyle="dark-content">
        <Title style={styles.navbarHeader}>{this.props.name.toUpperCase()}</Title>
        </Header>
      )
    } else {
      return (
        <View>
        <Header style={styles.navbar} iosBarStyle="dark-content">
        <Title style={styles.navbarHeader}>{"Buddy".toUpperCase()}</Title>
        </Header>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  navbar: {
    paddingTop: 22,
    paddingBottom: 0,
    backgroundColor: colors.liteTan,
    borderBottomWidth: 2,
    borderBottomColor: colors.darkGray,
  },
  navbarHeader: {
    fontFamily: 'Crete Round',
    fontSize: 24,
    color: colors.darkGray,
  },
});
