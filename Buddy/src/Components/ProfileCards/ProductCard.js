import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem,  Text, Body } from 'native-base';
import { VictoryChart, VictoryTheme, VictoryBar, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory-native';
import { connect } from 'react-redux';
import { colors } from '../../assets/Theme'

class ProductCard extends Component {
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
      <Container style={styles.card}>
          <Card>
            <CardItem>
              <BarChart data={this.constructData(this.props.logs)} />
            </CardItem>
          </Card>
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
        padding={{left: 20, top: 10, bottom: 30, right: 65}}
        height={300}
        width={380}
      >
        <VictoryBar
          data={this.props.data}
          x="product"
          y="freq"
          labels={(d)=> d.y}
          style={{
            data: {fill: colors.earthy},
            labels: {
              fontFamily: 'Josefin Sans',
              fontSize: 16,
              fontWeight: '400'
            }
          }}
        />
        <VictoryAxis
          style={{
            tickLabels: {
              fontFamily: 'Josefin Sans',
              fontSize: 16,
              fontWeight: '400'
            }
          }}
        />
      </VictoryChart>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.liteTan,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  }
})
