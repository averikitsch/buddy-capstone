import React from "react";
import { AppRegistry, View, StatusBar } from "react-native";
import { Container, Body, Content, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text } from "native-base";

export default class NineChat extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Nine Chat</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Item floatingLabel style={{ marginTop: 20 }}>
            <Label>Nine Chat</Label>
            <Input />
          </Item>
          <Button rounded danger
            style={{ marginTop: 20, alignSelf: "center" }}
            onPress={() => navigate("Profile")}>
            <Text>Goto Nine Profile</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
