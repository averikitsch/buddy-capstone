import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Container, Body, Content, Left, Right, Title, Input, Item, Form, Label, Button, Text, Picker }  from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import BuddyHeader from '../Components/HeaderComponent';


export default class TrackScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
      <BuddyHeader />
        <Content>
          <ProductFormHeader />
          <ProductFormBody />


      </Content>
    </Container>
    );
  }
};


class ProductFormHeader extends React.Component {
  render() {
    return (
      <View style={styles.HeaderContainer}>
        <View style={styles.ImageContainer}>
          <Image style={styles.image} source={require('../assets/temp.jpeg')} />
        </View>
        <View style={styles.TextContainer}>
        <Form>
            <Item floatingLabel >
              <Label>NAME</Label>
              <Input />
            </Item>
            <Item floatingLabel >
              <Label>BRAND</Label>
              <Input />
            </Item>
              <ProductPicker />
          </Form>
        </View>
      </View>
    )
  }
}

class ProductFormBody extends React.Component {
  render() {
    return (
      <Container>
      </Container>
    )
  }
}

class ProductPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
      <Container>
      <Picker
        mode="dropdown"
        placeholder="PRODUCT TYPE"
        selectedValue={this.state.selected}
        onValueChange={this.onValueChange.bind(this)}
      >
        <Item label="Flower" value="key0" />
        <Item label="Joint" value="key1" />
        <Item label="Extract" value="key2" />
        <Item label="Vape" value="key3" />
        <Item label="Edible" value="key4" />
      </Picker>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  HeaderContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#DDDDDD',
    flexDirection: 'column',
    padding: 8,
    marginBottom: 10,
  },
  ImageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  TextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  Header: {
    fontWeight: 'bold',
  },
  SubHeader: {
    color: 'gray',
  },
});
