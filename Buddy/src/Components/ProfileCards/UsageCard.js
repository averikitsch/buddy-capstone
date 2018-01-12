import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem,  Text, Body } from 'native-base';
import { VictoryChart, VictoryTheme, VictoryArea, VictoryAxis, VictoryLabel } from 'victory-native';
import { connect } from 'react-redux';

const usageData = [
  {x: "01-01-2018", y: 10},
  {x: "01-02-2018", y: 2},
  {x: "01-03-2018", y: 1},
  {x: "01-05-2018", y: 4},
  {x: "01-10-2018", y: 6},
];

class UsageCard extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
    }
  }
  componentWillMount() {
    this.setState({
      data: this.props.logs
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.logs.length > this.state.data) {
      this.setState({
        data: this.props.logs,
      })
    }
  }
  constructData(logs) {
    const dates = logs.map((log) => {
      return log.date
    })
    const tempData = {};
    [...new Set(dates)].forEach((date) => {
      tempData[date] = 0
    })
    logs.forEach((log) => {
      tempData[log.date] += log.quantity
    })
    return Object.keys(tempData).map((date) => {
      return {x: date, y: tempData[date]}
    })
  }
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <UseChart data={this.constructData(this.state.data)} />
            </CardItem>
          </Card>
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

export default connect(mapStateToProps)(UsageCard)

class UseChart extends React.Component {
  render() {
    return (
      <VictoryChart>
      <VictoryArea
      style={{ data: { fill: "green" } }}
      data={this.props.data}
      />
      </VictoryChart>
    )
  }
}
