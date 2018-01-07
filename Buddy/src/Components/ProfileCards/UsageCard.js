import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem,  Text, Body } from 'native-base';
import { VictoryChart, VictoryTheme, VictoryArea, VictoryAxis, VictoryLabel } from 'victory-native';

const usageData = [
  {x: "01-01-2018", y: 10},
  {x: "01-02-2018", y: 2},
  {x: "01-03-2018", y: 1},
  {x: "01-05-2018", y: 4},
  {x: "01-10-2018", y: 6},
];

export default class UsageCard extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <UseChart data={usageData} />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

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
