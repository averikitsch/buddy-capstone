import React from 'react';
import { StyleSheet, ListView, View, Image, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Button, Icon, List, ListItem, Title, Text, Body, Thumbnail, Left, Right, Segment, Header } from 'native-base';
import { connect } from 'react-redux';
import Log from './Log'
import ProductHeader from '../Components/ProductHeaderComponent';
import { rmLog, updateLog, rmWish, selectLog, deselectLog } from '../Actions/index';
import { convert } from '../lib/TrackConverter';

class WishList extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // this.state = {
    //   basic: true,
    //   listViewData: this.props.wishlist,
    // };
  }
  deleteRow(data) {
    // rowMap[`${secId}${rowId}`].props.closeRow();
    // const newData = [...this.state.listViewData];
    // const wish = newData.splice(rowId, 1)[0];
    // this.setState({ listViewData: newData });
    this.props.actions.rmWish(data);
  }
  render() {
    const { navigate } = this.props.navigation;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Content>
          <List
            dataSource={this.ds.cloneWithRows(this.props.wishlist)}
            renderRow={ data =>
              <ListItem>
                <Log data={convert(data)} />
              </ListItem>
            }
            renderLeftHiddenRow={data =>
              <Button full onPress={() => navigate("Track")}>
                <Icon active name="md-create" />
              </Button>}
            renderRightHiddenRow={(data) =>
              <Button full danger onPress={_ => this.deleteRow(data)}>
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

function mapStateToProps (store) {
  return {
    wishlist: store.wishlist.wishlist,
   }
}

function mapDispatchToProps (dispatch) {
  return {
  actions: {
    rmWish: wish => dispatch(rmWish(wish)),
  }}
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList)


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
