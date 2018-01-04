import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem,  Text, Body } from 'native-base';
import { VictoryChart, VictoryTheme, VictoryBar, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory-native';

const productData = [
  {product: "flower", freq: 10},
  {product: "concentrate", freq: 2},
  {product: "joints", freq: 5},
  {product: "vape", freq: 1},
  {product: "edibles", freq: 1},
];

export default class TypeCard extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <BarChart data={productData} />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

class BarChart extends React.Component {
  render() {
      return (
        <VictoryChart
          domainPadding={20}
        >
          <VictoryBar
            data={this.props.data}
            x="product"
            y="freq"
            style={{data: {fill: "green"}}}
          />
        </VictoryChart>
      )
    }
  }
