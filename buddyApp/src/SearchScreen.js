/* eslint-disable */
import React from "react";
import { AppRegistry, Dimensions, View, StyleSheet } from "react-native";
import { Container, Body, Content, Left, Right, Icon, Title, Input, Item, Label, Button, Text } from "native-base";
import Header from './HeaderComponent';
import Camera from 'react-native-camera';

export default class SearchScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header name="Search" />
        <CameraComponent />
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

const styles = StyleSheet.create({
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
