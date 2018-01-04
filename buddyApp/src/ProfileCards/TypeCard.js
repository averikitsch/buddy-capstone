import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem,  Text, Body } from 'native-base';
import { VictoryChart, VictoryTheme, VictoryPie, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory-native';

const typeData = {indica: 40, sativa: 20, hybrid: 40,};

export default class TypeCard extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <PieChart data={typeData} />
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.processData(this.props.data),
    };
  }
  processData(data) {
    return Object.entries(typeData).map((key) => {
      return {x: key[0], y: key[1]}
    })
  }
  render() {
    return (
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryPie
        data={this.state.data}
          colorScale={["orange", "cyan", "navy" ]}
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
