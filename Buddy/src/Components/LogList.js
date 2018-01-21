import React from 'react';
import { StyleSheet, ListView, View, Image, Alert } from 'react-native';
import { Container, Content, Card, CardItem, Button, Icon, List, ListItem, Title, Text, Body, Thumbnail, Left, Right, Segment, Header } from 'native-base';
import { connect } from 'react-redux';
import Log from './Log'
import ProductHeader from '../Components/ProductHeaderComponent';
import { rmLog, updateLog, rmWish, selectLog } from '../Actions/index';
import { convert } from '../lib/TrackConverter';


class LogList extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.handleClick = this.handleClick.bind(this);
  }
  deleteLog(data) {
    console.log(data)
    this.props.actions.rmLog(data);
  }
  handleClick(data) {
    this.props.actions.selectLog(data);
    this.props.navigation.navigate('View');
  }
  render() {
    const { navigate } = this.props.navigation;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Content>
          <List
            dataSource={this.ds.cloneWithRows(this.props.logs)}
            renderRow={ data =>
              <ListItem>
                <Log
                  data={convert(data)}
                />
              </ListItem>
            }
            renderLeftHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full onPress={_ => this.handleClick(data)}>
                <Icon active name="md-create" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => this.deleteLog(data)}>
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

function mapStateToProps (store) {
  return {
    logs: store.logs.logs,
   }
}

function mapDispatchToProps (dispatch) {
  return {
  actions: {
    rmLog: log => dispatch(rmLog(log)),
    updateLog: log => dispatch(updateLog(log)),
    selectLog: log => dispatch(selectLog(log)),
    // deselectLog: log => dispatch(deselectLog()),
  }}
}

export default connect(mapStateToProps, mapDispatchToProps)(LogList)
