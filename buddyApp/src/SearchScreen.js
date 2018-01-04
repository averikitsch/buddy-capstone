/* eslint-disable */
import React from "react";
import { AppRegistry, View, StatusBar } from "react-native";
import { Container, Body, Content, Left, Right, Icon, Title, Input, Item, Label, Button, Text } from "native-base";
import Header from './HeaderComponent';

export default class SearchScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header name="Search" />
        <Content padder>
          <Item floatingLabel style={{ marginTop: 20 }}>
            <Label>Jade Chat</Label>
            <Input />
          </Item>
          <Button rounded danger
            style={{ marginTop: 20, alignSelf: "center" }}
            onPress={() => navigate("Profile")}>
            <Text>Goto Jade Profile</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
