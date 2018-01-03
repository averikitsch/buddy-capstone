/*eslint-disable*/
import React from 'react';
import { AppRegistry, View, StatusBar, Image, StyleSheet } from 'react-native';
import { Container, Body, Content, Header, Left, Right, Title, Input, Item, Label, Button, Text } from 'native-base';

export default class HeaderComponent extends React.Component {
  render() {
    return (
        <Header style={styles.navbar}>
          <Title>Buddy</Title>
        </Header>
    )
  }
}

const styles = StyleSheet.create({
  navbar: {
      // paddingTop: 30,
      // height: 55,
      // backgroundColor: 'green',
      // borderBottomWidth: StyleSheet.hairlineWidth,
      // borderBottomColor: '#DDDDDD',
      // paddingHorizontal: 12,
      // flexDirection: 'column', // step 1
      // justifyContent: 'space-between', // step 2
      // alignItems: 'center', // step 3
    },
});
