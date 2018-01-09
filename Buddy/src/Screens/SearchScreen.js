/* eslint-disable */
import React from "react";
import { AppRegistry, Dimensions, View, StyleSheet } from "react-native";
import { Container, Header, Body, Content, Left, Right, Icon, Title, Input, Item, Label, Button, Text } from "native-base";
import BuddyHeader from '../Components/HeaderComponent';
import Camera from 'react-native-camera';

export default class SearchScreen extends React.Component {
  render() {
    return (
      <Container>
        <BuddyHeader name="Search" />
        <View style={styles.search}>
          <SearchBar style={styles.searchBar} />
          <View style={styles.camera}>
            <CameraComponent />
          </View>
        </View>
      </Container>
    )
  }
}

class CameraComponent extends React.Component {
  takePicture() {
    this.camera.capture()
    .then((data) => console.log(data))
    .catch(err => console.error(err));
  }
  render() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}>
        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[SMOKE]</Text>
      </Camera>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <Container>
        <Header searchBar>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>

        </Header>
      </Container>
    );
  }
}

// <Button transparent>
//   <Text>Search</Text>
// </Button>

const styles = StyleSheet.create({
  search: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  // searchBar: {
  //   flex: 1,
  // },
  camera: {
    flex: 6,
  },
  preview: {
   flex: 1,
   justifyContent: 'flex-end',
   alignItems: 'center',
   height: Dimensions.get('window').width,
   width: Dimensions.get('window').width
 },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
})
