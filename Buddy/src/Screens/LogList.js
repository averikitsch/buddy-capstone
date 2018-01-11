import React from 'react';
import { StyleSheet, ListView, View, Image } from 'react-native';
import { Container, Content, Card, CardItem, Button, Icon, List, ListItem, Title, Text, Body, Thumbnail, Left, Right, Segment, Header } from 'native-base';
import { connect } from 'react-redux';
// import Header from '../HeaderComponent'
import ProductHeader from '../Components/ProductHeaderComponent';
import { rmLog, updateLog } from '../Actions/index';

class LogListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logs: true,
      wish: false,
    }
    this.handleLogsClick = this.handleLogsClick.bind(this);
    this.handleWishClick = this.handleWishClick.bind(this);
  }
  handleLogsClick() {
    this.setState({
      logs: true,
      wish: false,
    });
  }
  handleWishClick() {
    this.setState({
      logs: false,
      wish: true,
    });
  }
  render() {
    let page = null;
    if (this.state.logs) {
      page = <LogList
        data={this.props.logs}
        navigation={this.props.navigation}
        dispatch={this.props.actions}
      />;
    } else {
      page = <WishList data={this.props.wishlist} navigation={this.props.navigation} />;
    }
    return (
      <Container>
          <Header>
            <Segment>
              <Button first active={this.state.logs}
              onPress={this.handleLogsClick}>
                <Text>Logs</Text>
              </Button>
              <Button last active={this.state.wish}
              onPress={this.handleWishClick}>
                <Text>Wishlist</Text>
              </Button>
            </Segment>
          </Header>
          <Content padder>
            {page}
          </Content>
        </Container>
      );
  }
}

class LogList extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: this.props.data,
    };
    this.deleteLog = this.deleteLog.bind(this);
  }
  // deleteRow(secId, rowId, rowMap) {
  //   console.log(this.props);
  //   // rowMap[`${secId}${rowId}`].props.closeRow();
  //   // const newData = [...this.state.listViewData];
  //   // newData.splice(rowId, 1);
  //   // this.setState({ listViewData: newData });
  //   this.props.dispatch.rmLog()
  // }
  deleteLog(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    const log = newData.splice(rowId, 1)[0];
    this.setState({ listViewData: newData });
    this.props.dispatch.rmLog(log);
  }
  render() {
    const { navigate } = this.props.navigation;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Content>
          <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={ data =>
              <ListItem>
                <Log data={data} />
              </ListItem>
            }
            renderLeftHiddenRow={data =>
              <Button full onPress={() => navigate("Track")}>
                <Icon active name="md-create" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteLog(secId, rowId, rowMap)}>
              {/*_ => this.deleteRow(secId, rowId, rowMap)*/}
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

class WishList extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: this.props.data,
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
            renderRow={ data =>
              <ListItem>
                <Log data={data} />
              </ListItem>
            }
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
          <Thumbnail square size={100} source={require('../assets/images/temp.jpeg')} />
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

// Maps `state` to `props`:
// These will be added as props to the component.
function mapStateToProps (store) {
  return {
    logs: store.logs.logs,
    wishlist: store.wishlist.wishlist,
   }
}

function mapDispatchToProps (dispatch) {
  return {
  actions: {
    rmLog: log => dispatch(rmLog(log)),
    updateLog: log => dispatch(updateLog(log)),
  }}
}

export default connect(mapStateToProps, mapDispatchToProps)(LogListScreen)


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
