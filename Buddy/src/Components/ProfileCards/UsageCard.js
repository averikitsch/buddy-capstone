import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem,  Text, Body } from 'native-base';
import { VictoryChart, VictoryTheme, VictoryArea, VictoryAxis, VictoryLabel } from 'victory-native';
import { connect } from 'react-redux';
import { colors } from '../../assets/Theme'
import moment from 'moment';

class UsageCard extends Component {
  constructData(logs) {
    const dates = logs.map((log) => {
      return log.date
    })
    const tempData = {};
    [...new Set(dates)].forEach((date) => {
      tempData[date] = 0
    })
    logs.forEach((log) => {
      if (log.product == 5) {
        tempData[log.date] += log.quantity/ 10;
      } else {
        tempData[log.date] += log.quantity;
      }
    })
    let data =  Object.keys(tempData).map((date) => {
      return {x: moment(date, "MM/DD/YYYY").format('MM/DD'), y: tempData[date]}
    })
    if (data.length == 1) {
      data.unshift({
        x: moment(data[0].x, 'MM/DD').subtract(1, 'days').format('MM/DD'), y: 0
      })
    }

    return data
  }
  render() {
    return (
      <Container style={styles.card}>
          <Card>
            <CardItem>
              <UseChart data={this.constructData(this.props.logs)} />
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

export default connect(mapStateToProps)(UsageCard)

class UseChart extends React.Component {
  render() {
    return (
      <VictoryChart>
      <VictoryArea
      style={{ data: { fill: colors.earthy } }}
      data={this.props.data}
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
