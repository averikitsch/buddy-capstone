import React from 'react';
import { AppRegistry, View, StatusBar, Image, StyleSheet } from 'react-native';
import { Container, Body, Content, Header, Left, Right, Title, Input, Item, Label, Button, Text } from 'native-base';

export default class ProductHeader extends React.Component {
  render() {
    return (
      <View style={styles.HeaderContainer}>
        <View style={styles.ImageContainer}>
          <Image style={styles.image} source={require('../assets/temp.jpeg')} />
        </View>
        <View style={styles.TextContainer}>
          <Text style={styles.Header}>{this.props.name.toUpperCase()}</Text>
          <Text style={styles.SubHeader}>{this.props.brand.toUpperCase()}</Text>
          <Text style={styles.SubHeader}>{this.props.product.toUpperCase()}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  HeaderContainer: {
    flex: 1,
    // backgroundColor: 'blue',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#DDDDDD',
    flexDirection: 'row',
    padding: 8,
    marginBottom: 10,
  },
  ImageContainer: {
    flex: 2,
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
    flex: 4,
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
