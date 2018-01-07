import React from 'react';
import { StyleSheet, ListView, View, Image } from 'react-native';
import { Container, Content, Card, CardItem, Button, Icon, List, ListItem, Title, Text, Body, Thumbnail } from 'native-base';
import Header from '../HeaderComponent'
import ProductHeader from '../ProductHeaderComponent'

const datas = [
  {name: 'Lemon Drop', brand: "Dawg Star", product: "Flower"},
  {name: 'GG #4', brand: "Dawg Star", product: "Flower"},
  {name: 'LA Confidential', brand: "Dawg Star", product: "Flower"},
  {name: 'Frosted Flakes', brand: "Dawg Star", product: "Flower"},
  {name: 'Blueberry', brand: "Dawg Star", product: "Flower"},
  {name: 'Island Breeze', brand: "Western Cultured", product: "Flower"},
  {name: 'Kraken Black Pepper', brand: "Western Cultured", product: "Flower"},
  {name: 'PermaFrost', brand: "Western Cultured", product: "Flower"},
];

export default class LogListScreen extends React.Component {
  render() {
    return (
      <Container>
      <Header name="logs" />
      <LogList navigation={this.props.navigation}/>
      </Container>
    )
  }
}

class LogList extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: datas,
    };
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }
  render() {
    const { navigate } = this.props.navigation;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Content>
          <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem>
                <Log data={data} />
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => navigate("Track")}>
                <Icon active name="md-create" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                <Icon active name="trash" />
              </Button>}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </Content>
      </Container>
    );
  }
}

class Log extends React.Component {
  render() {
    return (
      <View style={styles.HeaderContainer}>
        <View style={styles.ImageContainer}>
          <Thumbnail square size={100} source={require('../../assets/temp.jpeg')} />
        </View>
        <View style={styles.TextContainer}>
          <Body>
            <Text style={styles.Header}>{this.props.data.name.toUpperCase()}</Text>
            <Text style={styles.SubHeader}>{this.props.data.brand.toUpperCase()}</Text>
            <Text style={styles.SubHeader}>{this.props.data.product.toUpperCase()}</Text>
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
