import React from 'react';
import { AppRegistry, View, StatusBar, Image, StyleSheet } from 'react-native';
import { Container, Body, Content, Left, Right, Title, Input, Item, Label, Button, Text } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './HeaderComponent';
import ProductHeader from './ProductHeaderComponent';

const testObj = {
  name: 'Seatown Lemon Haze',
  brand: 'Dawg Star',
  product: 'Flower',
  type: 'sativa',
  cross: ['Lemon Skunk', 'Super Silver Haze'],
  description: 'Gather your friends, strap on your explorer boots, don your chef hat, or unleash your inner artist – our Seatown Lemon Haze, also known as Super Lemon Haze, offers a creative, social and energetic high to get you ready for a moment of exploration or creativity.',
  image: '../assets/temp.png',
};

const types = {
  hybrid: "ios-happy-outline",
  sativa: "ios-headset-outline",
  indica: "ios-body-outline"
};

const styles = StyleSheet.create({
  image: {
    width: 55,
    resizeMode: 'stretch',
  }
});

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <Container>
      <Header />
        <Content>
          <ProductHeader name={testObj.name} brand={testObj.brand} product={testObj.product} image={testObj.image}/>
        <View>


            <Button block success>
              <Text>track</Text>
            </Button>

            <Icon name={types[testObj.type]} />
            <Text>{testObj.type}</Text>

            <Text>{testObj.cross[0]} x {testObj.cross[1]}</Text>

            <Text>{testObj.description}</Text>
            </View>
      </Content>
    </Container>
    );
  }
};
