import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem,  Text, Body } from 'native-base';
import { VictoryChart, VictoryTheme, VictoryPie, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory-native';
import { connect } from 'react-redux';

// const typeData = {indica: 40, sativa: 20, hybrid: 40,};

class TypeCard extends Component {
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
      <Container>
        <Content>
          <Card>
            <CardItem>
              <PieChart data={this.constructData(this.props.logs)} />
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

export default connect(mapStateToProps)(TypeCard)

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.processData(this.props.data),
    };
  }
  processData(data) {
    return Object.entries(data).map((key) => {
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
