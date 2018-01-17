import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Button, Segment, Header, Text, StyleProvider } from 'native-base';
import { connect } from 'react-redux';
import LogList from '../Components/LogList';
import WishList from '../Components/WishList';
import { rmLog, updateLog, rmWish, selectLog, deselectLog } from '../Actions/index';
import { convert } from '../lib/TrackConverter';
import { colors } from '../assets/Theme';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';


export default class LogScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      logs: true,
      wish: false,
    }
    this.handleLogsClick = this.handleLogsClick.bind(this);
    this.handleWishClick = this.handleWishClick.bind(this);
  }
  handleLogsClick() {
    this.setState({
      logs: true,
      wish: false,
    });
  }
  handleWishClick() {
    this.setState({
      logs: false,
      wish: true,
    });
  }
  render() {
    let page = null;
    if (this.state.logs) {
      page = <LogList
        navigation={this.props.navigation}/>;
        // data={this.props.logs}
        // dispatch={this.props.actions}
    } else {
      page = <WishList
        navigation={this.props.navigation}/>;
        // data={this.props.wishlist}
    }
    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
          <Header style={{backgroundColor: colors.lightGreen}}>
            <Segment style={{backgroundColor: colors.lightGreen}}>
              <Button first active={this.state.logs}
              onPress={this.handleLogsClick}>
                <Text>Logs</Text>
              </Button>
              <Button last active={this.state.wish}
              onPress={this.handleWishClick}>
                <Text>Wishlist</Text>
              </Button>
            </Segment>
          </Header>
          <Content style={styles.container}>
            {page}
          </Content>
        </Container>
        </StyleProvider>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4df',
  }
});
