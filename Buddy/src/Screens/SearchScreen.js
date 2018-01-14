/* eslint-disable */
import React from "react";
import { AppRegistry, Dimensions, View, StyleSheet, Text, TouchableHighlight } from "react-native";
import { Container, Header, Body, Content, Left, Right, Icon, Title, Input, Item, Label, Button, List, ListItem} from "native-base";
import BuddyHeader from '../Components/HeaderComponent';
import Camera from 'react-native-camera';
import axios from 'axios';
import {connect} from 'react-redux';
import { findItem, fetchStrains } from '../Actions/index';

class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'SEARCH',
  });
  constructor(props) {
    super(props);
    this.props.fetchStrains();
  }
  render() {
    return (
      <Container>
      <View style={styles.search}>
      <SearchBar
        style={styles.searchBar}
        dispatch={this.props.findItem}
        navigation={this.props.navigation} />
        {/*<BuddyHeader name="Search" />
      <View style={styles.camera}>
      <TouchableHighlight >
      <Text>CLICK ME</Text>
      </TouchableHighlight>
      <Text>{this.props.item ? this.props.item.name : ''}</Text>
      </View>*/}
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
    findItem: item => dispatch(findItem(item)),
    fetchStrains: () => dispatch(fetchStrains()),
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
      text: '',
    }
    this.handleEnter = this.handleEnter.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  handleTextChange(text) {
    // console.log(text);
    this.setState({
      text: text
    })
  }
  handleEnter(e) {
      // dismissKeyboard();
    axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/search/name/${this.state.text}`)
      .then((response) => {
        const data = response.data[0]
        const id = response.data[0].id;
        axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/data/effects/${id}`)
          .then((response) => {
            console.log(response.data)
            const effects = response.data;
            axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/data/flavors/${id}`)
              .then((response) => {
                console.log(response.data)
                const flavors = response.data;
                const dataObj = {...data, effects: effects, flavors: flavors}
                console.log(dataObj)
                this.props.dispatch(dataObj)
                this.props.navigation.navigate("Found");
              })
          })
      })
      .catch((err) => {
        console.log(err);
        this.props.dispatch(err)
        this.props.navigation.navigate("Found");
      })
  }
  render() {
    return (
      <Container>
        <Header searchBar>
          <Item>
            <Input placeholder="Search"
              onChangeText={this.handleTextChange}
            />
            <TouchableHighlight  onPress={this.handleEnter}>
              <Icon name="ios-search" />
            </TouchableHighlight >
          </Item>
        </Header>
        <List>
          <ListItem >
              <Text></Text>
          </ListItem>
        </List>
      </Container>
    );
  }
}


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
