import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem,  Text, Body } from 'native-base';
import { VictoryBar, VictoryChart, VictoryPolarAxis, VictoryTheme, VictoryGroup, VictoryArea, VictoryLabel } from "victory-native";

const flavorData = [{spicy: 60, sour: 20, sweet: 5, earthy: 15}];

export default class FlavorCard extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem style={styles.card}>
              <RadarChart data={flavorData} style={styles.chart}/>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

class RadarChart extends React.Component {
  constructor(props) {
    super(props);
    this.props.data.push({spicy: 100, sour: 100, sweet: 100, earthy: 100})
    this.state = {
      data: this.processData(this.props.data),
      maxima: this.getMaxima(this.props.data)
    };
  }

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
    return (
      <VictoryChart polar
        theme={VictoryTheme.material}
        domain={{ y: [ 0, 1 ] }}
        height={250}
        padding={{top: 25, bottom: 25}}>

        <VictoryGroup colorScale={["green","white"]}
          style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}>
          {this.state.data.map((data, i) => {
            return <VictoryArea key={i} data={data}/>;
          })}
        </VictoryGroup>
      {
        Object.keys(this.state.maxima).map((key, i) => {
          return (
            <VictoryPolarAxis key={i} dependentAxis
              style={{
                axisLabel: { padding: 10 },
                axis: { stroke: "none" },
                grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
              }}
              tickLabelComponent={
                <VictoryLabel labelPlacement="vertical"/>
              }
              labelPlacement="perpendicular"
              axisValue={i + 1} label={key}
              tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
              tickValues={[0.25, 0.5, 0.75]}
            />
          );
        })
      }
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickFormat={() => ""}
        style={{
          axis: { stroke: "none" },
          grid: { stroke: "grey", opacity: 0.5 }
        }}
      />

      </VictoryChart>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  }
})
