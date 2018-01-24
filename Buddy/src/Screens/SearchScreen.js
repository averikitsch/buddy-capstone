/* eslint-disable */
import React from "react";
import { AppRegistry, Dimensions, View, StyleSheet, Text, TouchableHighlight, Alert } from "react-native";
import { Container, Header, Body, Content, Left, Right, Icon, Title, Input, Item, Label, Button, List, ListItem} from "native-base";
import BuddyHeader from '../Components/HeaderComponent';
import Camera from 'react-native-camera';
import axios from 'axios';
import {connect} from 'react-redux';
import { findItem, fetchStrains } from '../Actions/index';
import { colors, sharedStyles } from '../assets/Theme';

class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'SEARCH',
    headerStyle: sharedStyles.headerStyle,
    headerTitleStyle: sharedStyles.headerTitleStyle,
    headerBackTitleStyle: sharedStyles.headerBack,
    headerTintColor: sharedStyles.headerBackButton,
  })
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }
  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText,
    });
  }
  render() {
    return (
      <Container>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
          dispatch={this.props.findItem}
          navigation={this.props.navigation}
        />
        <Content style={styles.content}>
          <ListStrains
            strains={this.props.list}
            filterText={this.state.filterText}
            clickItem={this.handleFilterTextChange}
          />
        </Content>
      </Container>
    )
  }
}

function mapStateToProps (store) {
  return {
    list: store.search.allStrains
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
    this.handleEnter = this.handleEnter.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  handleTextChange(text) {
    this.props.onFilterTextChange(text);
  }
  handleEnter(e) {
      // dismissKeyboard();
    e.preventDefault();
    const text = this.props.filterText;
    axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/search/name/${text}`)
      .then((response) => {
        let data = response.data[0]
        if (response.data.length > 1){
          response.data.forEach((log) => {
            if (log.name.toLowerCase() == text.toLowerCase()) {
              data = log;
            }
          })
        }
        if (data) {
        const id = data.id;
          axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/data/effects/${id}`)
          .then((response) => {
            const effects = response.data;
            axios.get(`http://strainapi.evanbusse.com/5QPNwCQ/strains/data/flavors/${id}`)
            .then((response) => {
              const flavors = response.data;
              const dataObj = {...data, effects: effects, flavors: flavors}
              this.props.dispatch(dataObj)
              this.props.navigation.navigate("Found");
            })
          })
        } else {
          const dataObj = {name: text}
          this.props.dispatch(dataObj)
          this.props.navigation.navigate("Found");
        }
      })
  }
  render() {
    return (
        <Header searchBar style={styles.searchBar}>
          <Item style={styles.searchBox}>
            <Input placeholder=" Search"
              onChangeText={this.handleTextChange}
              value={this.props.filterText}
              style={styles.listItemText}
            />
            <TouchableHighlight onPress={this.handleEnter}>
              <Icon name="ios-search" />
            </TouchableHighlight >
          </Item>
        </Header>
    );
  }
}

class ListStrains extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(text) {
    this.props.clickItem(text)
  }
  render() {
    const filterText = this.props.filterText;
    const rows = this.props.strains.filter((strain) => {
      if (strain.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) {
        return strain
      }
    })
    rowItems = rows.map((strain, i) => {
      return (
        <ListItem style={styles.listItem} key={i} onPress={() => this.handleClick(strain)}>
          <Text style={styles.listItemText}>{strain}</Text>
        </ListItem>
      )
    })
    return (
        <List>
          {rowItems}
        </List>
    )
  }
}

const styles = StyleSheet.create({
  listItemText: {
    fontFamily: 'Josefin Sans',
    fontWeight: '300',
    fontSize: 18,
  },
  listItem: {
    marginLeft: 0,
    paddingLeft: 10,
    backgroundColor: colors.liteTan,
  },
  content: {
    backgroundColor: colors.liteTan,
  },
  search: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  searchBar: {
    backgroundColor: colors.liteTan,
    margin: 0,
    paddingTop: 0,
  },
  searchBox: {
    borderRadius: 20,
  },
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
