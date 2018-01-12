import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem,  Text, Body } from 'native-base';
import { VictoryChart, VictoryTheme, VictoryBar, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory-native';
import { connect } from 'react-redux';

// const productData = [
//   {product: "flower", freq: 10},
//   {product: "concentrate", freq: 2},
//   {product: "joints", freq: 5},
//   {product: "vape", freq: 1},
//   {product: "edibles", freq: 1},
// ];

class ProductCard extends Component {
  // constructor(){
  //   super();
  //   this.state = {
  //     data: [],
  //   }
  // }
  // componentWillMount() {
  //   this.setState({
  //     data: this.props.logs
  //   })
  // }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.logs.length > this.state.data) {
  //     this.setState({
  //       data: this.props.logs,
  //     })
  //   }
  // }
  constructData(logs) {
    const productData = [
      {product: "Flower", freq: 0},
      {product: "Pre-roll", freq: 0},
      {product: "Extract", freq: 0},
      {product: "Vape", freq: 0},
      {product: "Edible", freq: 0},
    ];

    logs.forEach((log) => {
      productData[log.product-1].freq += 1;
    })
    const data = productData.map((product) => {
      return {product: product.product, freq: product.freq}
    })
    return data;
  }
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <BarChart data={this.constructData(this.props.logs)} />
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

export default connect(mapStateToProps)(ProductCard)

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
