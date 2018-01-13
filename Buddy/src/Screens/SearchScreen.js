/* eslint-disable */
import React from "react";
import { AppRegistry, Dimensions, View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { Container, Header, Body, Content, Left, Right, Icon, Title, Input, Item, Label, Button} from "native-base";
import BuddyHeader from '../Components/HeaderComponent';
import Camera from 'react-native-camera';
import axios from 'axios';
import {connect} from 'react-redux';
import { findItem } from '../Actions/index';

class SearchScreen extends React.Component {

  render() {
    return (
      <Container>
      <BuddyHeader name="Search" />
      <View style={styles.search}>
      <SearchBar
        style={styles.searchBar}
        dispatch={this.props.findItem}
        navigation={this.props.navigation} />
      <View style={styles.camera}>
      <TouchableHighlight >
      <Text>CLICK ME</Text>
      </TouchableHighlight>
      <Text>{this.props.item ? this.props.item.name : ''}</Text>
      </View>
      </View>
      </Container>
    )
  }
}
// <CameraComponent />

function mapStateToProps (store) {
  return {
    item: store.search.found
  }
}

function mapDispatchToProps (dispatch) {
  return {
    findItem: item => dispatch(findItem(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)

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
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.handleEnter = this.handleEnter.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  handleTextChange(text) {

  }
  handleEnter(e) {
    console.log(e)
    if(e.nativeEvent.key == "Enter"){
      // dismissKeyboard();
      axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/search/name/${this.state.text}`)
      .then((response) => {
        console.log(response)
        // const id = response.data[0].id;
        // const effects = axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/data/effects/${id}`)
        //   .then((response) => {
        //     return response.data
        //   })
        // const flavors = axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/data/effects/${id}`)
        //   .then((response) => {
        //     return response.data
        //   })
        this.props.dispatch(response.data[0])
        this.props.navigation.navigate("Found");
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      console.log(text);
      this.setState({
        text: text
      })
    }
  }
  render() {
    return (
      <Container>
        <Header searchBar>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onTextChange={this.handleTextChange} onKeyPress={this.handleEnter}/>
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
