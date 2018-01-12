import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem,  Text, Body } from 'native-base';
import { VictoryBar, VictoryChart, VictoryPolarAxis, VictoryTheme, VictoryGroup, VictoryArea, VictoryLabel } from "victory-native";
import { connect } from 'react-redux';


class FlavorCard extends Component {
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
    console.log(this.props.logs)
    return (
      <Container>
        <Content>
          <Card>
            <CardItem style={styles.card}>
              <RadarChart data={this.constructData(this.state.data)} style={styles.chart}/>
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

export default connect(mapStateToProps)(FlavorCard)

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
