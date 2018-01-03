import React from 'react';
import { AppRegistry, View, StatusBar, Image, StyleSheet } from 'react-native';
import { Container, Body, Content, Header, Left, Right, Title, Input, Item, Label, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const types = {
  hybrid: "ios-happy-outline",
  sativa: "ios-headset-outline",
  indica: "ios-body-outline"
};

export default class ProductBody extends React.Component {
  render() {
    return (
      <View style={styles.Container}>
        <Icon name={types[this.props.obj.type]} />
        <Text>{this.props.obj.type}</Text>

        <Text>{this.props.obj.cross[0]} x {this.props.obj.cross[1]}</Text>

        <Text>{this.props.obj.description}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 10,
  },
});
