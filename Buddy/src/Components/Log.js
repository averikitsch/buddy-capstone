import React from 'react';
import { StyleSheet, ListView, View, Image, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Button, Icon, List, ListItem, Title, Text, Body, Thumbnail, Left, Right, Segment, Header } from 'native-base';

export default class Log extends React.Component {
  render() {
    return (
      <View style={styles.HeaderContainer}>
        <View style={styles.ImageContainer}>
          <Thumbnail square size={100} source={require('../assets/images/temp.jpeg')} />
        </View>
        <View style={styles.TextContainer}>
          <Body>
            <Text style={styles.Header}>{this.props.data.name.toUpperCase()}</Text>
            <Text style={styles.SubHeader}>{this.props.data.brand ? this.props.data.brand.toUpperCase() : "BRAND UNDEFINED"}</Text>
            <Text style={styles.SubHeader}>{this.props.data.product ? this.props.data.product.toUpperCase() : 'PRODUCT UNDEFINED'}</Text>
          </Body>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  HeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 3,
  },
  ImageContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextContainer: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignSelf: 'flex-start',
  },
  Header: {
    fontWeight: 'bold',
  },
  SubHeader: {
    color: 'gray',
  },
});
