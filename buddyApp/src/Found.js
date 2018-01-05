import React from 'react';
import { AppRegistry, View, StatusBar, Image, StyleSheet } from 'react-native';
import { Container, Body, Content, Left, Right, Title, Input, Item, Label, Button, Text } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/Ionicons';
import Header from './HeaderComponent';
import ProductHeader from './ProductHeaderComponent';
import ProductBody from './ProductBodyComponent';

const testObj = {
  name: 'Seatown Lemon Haze',
  brand: 'Dawg Star',
  product: 'Flower',
  type: 'sativa',
  cross: ['Lemon Skunk', 'Super Silver Haze'],
  description: 'Gather your friends, strap on your explorer boots, don your chef hat, or unleash your inner artist – our Seatown Lemon Haze, also known as Super Lemon Haze, offers a creative, social and energetic high to get you ready for a moment of exploration or creativity.',
  image: '../assets/temp.png',
};


export default class FoundScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
      <Header />
        <Content>
          <ProductHeader name={testObj.name} brand={testObj.brand} product={testObj.product} image={testObj.image}/>
          <Button block success
            onPress={() => navigate("Profile")}>
            <Text>track</Text>
          </Button>
          <ProductBody obj={testObj} />


      </Content>
    </Container>
    );
  }
};
