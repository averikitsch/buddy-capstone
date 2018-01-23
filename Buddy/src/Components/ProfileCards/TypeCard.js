import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem,  Text, Body } from 'native-base';
import { VictoryChart, VictoryTheme, VictoryPie, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory-native';
import { connect } from 'react-redux';
import { colors } from '../../assets/Theme'

class TypeCard extends Component {
  constructData(logs) {
    const typeData = {indica: 0, sativa: 0, hybrid: 0,}
    logs.forEach((log) => {
      typeData[log.type] += 1;
    })
    const count = logs.length;
    Object.keys(typeData).forEach((type) => {
      typeData[type] = typeData[type] / count * 100
    })
    return typeData;
  }
  render() {
    return (
      <Container style={styles.card}>
          <Card>
            <CardItem>
              <PieChart data={this.constructData(this.props.logs)} />
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

export default connect(mapStateToProps)(TypeCard)

class PieChart extends React.Component {
  processData(data) {
    return Object.entries(data).map((key) => {
      return {x: key[0], y: key[1]}
    })
  }
  render() {
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryPie
        data={this.processData(this.props.data)}
          colorScale={[colors.earthy, colors.sour, colors.spicy ]}
          standalone={false}
          width={300} height={300}
          innerRadius={40} labelRadius={100}
          padAngle={3}
          style={{ labels: { fill: "white", fontSize: 18, } }}
          labels={(d) => `${d.x}\n${d.y}%`}
          labelComponent={<VictoryLabel textAnchor={"middle"} verticalAnchor={"start"}/>}
        />
         <VictoryAxis style={{ axis: {stroke: "none"} }} />
      </VictoryChart>
    );
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
