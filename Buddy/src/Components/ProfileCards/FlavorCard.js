import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem,  Text, Body } from 'native-base';
import { VictoryBar, VictoryChart, VictoryPolarAxis, VictoryTheme, VictoryGroup, VictoryArea, VictoryLabel } from "victory-native";
import { connect } from 'react-redux';
import { colors } from '../../assets/Theme'

class FlavorCard extends Component {
  constructData(logs) {
    const flavorData = {spicy: 0, sour: 0, sweet: 0, earthy: 0}
    logs.forEach((log) => {
      Object.keys(log.flavors).forEach((flavor) => {
        log.flavors[flavor] ? flavorData[flavor] += 1 : null
      })
    })
    const count = logs.length;
    Object.keys(flavorData).forEach((flavor) => {
      flavorData[flavor] /= count;
      flavorData[flavor] *= 100;
    })
    return [flavorData];
  }
  render() {
    return (
      <Container style={styles.card}>
          <Card>
            <CardItem>
              <RadarChart data={this.constructData(this.props.logs)} style={styles.chart}/>
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

export default connect(mapStateToProps)(FlavorCard)

class RadarChart extends React.Component {
  getMaxima(data) {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
  }

  processData(data) {
    const maxByGroup = this.getMaxima(data);
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.map((datum) => makeDataArray(datum));
  }

  render() {
    const dataCopy = this.props.data;
    dataCopy.push({spicy: 100, sour: 100, sweet: 100, earthy: 100})
    const data = this.processData(dataCopy);
    const maxima = this.getMaxima(dataCopy);
    return (
      <VictoryChart polar
        theme={VictoryTheme.material}
        animate={{ duration: 1000 }}
        domain={{ y: [ 0, 1 ] }}
        height={290}
        width={290}
        // padding={{top: 25, left: 5}}
        // padding={{right: 25}}
      >

        <VictoryGroup colorScale={[colors.earthy,"white"]}
          style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}>
          {data.map((data, i) => {
            return <VictoryArea key={i} data={data}/>;
          })}
        </VictoryGroup>
      {
        Object.keys(maxima).map((key, i) => {
          return (
            <VictoryPolarAxis key={i} dependentAxis
              style={{
                axis: { stroke: "none" },
                grid: { stroke: "grey", strokeWidth: 0.5, opacity: 0.75 },
                tickLabels: {
                  fontSize: 16,
                  fontFamily: 'Josefin Sans',
                  fontWeight: '300'
                },
                axisLabel: {
                  fontSize: 20,
                  fontFamily: 'Josefin Sans',
                  fontWeight: '400',
                  padding: 15,
                  paddingRight: 25
                }
              }}
              tickLabelComponent={
                <VictoryLabel labelPlacement="vertical"/>
              }
              labelPlacement="perpendicular"
              axisValue={i + 1} label={key}
              tickFormat={(t) => Math.ceil(t * maxima[key])}
              tickValues={[0.25, 0.5, 0.75]}
            />
          );
        })
      }
      <VictoryPolarAxis
        labelPlacement="perpendicular"
        tickFormat={() => ""}
        style={{
          grid: { stroke: "grey", opacity: 0.5 },
          tickLabels: {fontSize: 24}
        }}
      />

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
  },
  text: {
    fontFamily: 'Josefin Sans',
    fontSize: 14,
  }
})
