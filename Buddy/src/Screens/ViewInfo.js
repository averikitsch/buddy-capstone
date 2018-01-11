import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableHighlight, Alert } from 'react-native';
import { Container, Body, Content, Left, Right, Title, Input, Item, Label, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../Components/HeaderComponent';
import { colors, flavorColors } from '../assets/Theme';

class ViewInfoScreen extends React.Component {
  // const { navigate } = this.props.navigation;
  static navigationOptions = ({ navigation }) => ({
      title: 'Log',
      headerRight: <Icon name="ios-cog" size={40}
        onPress={() => navigation.navigate("Edit")}/>,
    });
  render() {
    const log = this.props.navigation.params;
    const { navigate } = this.props.navigation;
    if (log) {
    return (
      <Container>

        <Content style={styles.formContentBody}>
          {Object.entries(log).map((item) => {
            return <Text>{item}</Text>
          })}
        </Content>
    </Container>
    )
  } else {
    return (
      <Container>
      </Container>
    )
  }
  }
};

export default ViewInfoScreen;

const styles = StyleSheet.create({
  formContentBody: {
    flex: 1,
    backgroundColor: colors.liteTan,
  },
  bodyContainer: {
    flex: 4,
    flexDirection: 'column',
    padding: 10,
  },
  text: {
    fontFamily: 'Josefin Sans',
    fontWeight: "300",
    fontSize: 18,
  },
  label: {
    fontFamily: 'Crete Round',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGray,
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    // justifyContent: 'space-around'
  },
  type: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cross: {
    flex: 3,
    borderLeftWidth: 3,
    borderLeftColor: colors.darkGray,
    paddingLeft: 20,
  },
  HeaderContainer: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: colors.darkGray,
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
  },
  ImageContainer: {
    // flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 60,
    overflow: 'hidden',
  },
  TextContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  Header: {
    fontWeight: 'bold',
    fontFamily: 'Josefin Sans',
    fontSize: 20,
  },
  SubHeader: {
    color: 'gray',
    fontFamily: 'Josefin Sans',
    fontWeight: '300',
  },
  Buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  Button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: colors.darkGray,
    borderWidth: 2,
    marginBottom: 20,
    marginTop: 10,
  },
  flavorCards: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 15,
  },
  flavorCard: {
    padding: 10,
    margin: 10,
    height: 80,
    width: 80,
    borderRadius:10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flavorText: {
    color: "white",
    fontWeight: 'bold',
    fontFamily: 'Josefin Sans',
  },
  effectCard: {
    paddingTop: 3,
    paddingHorizontal: 3,
    margin: 2,
    borderRadius:3,
  },
  effectCards: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardStack: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  effectIcon: {
    marginRight: 5,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  CardWrapper: {
    margin: 2,
    padding: 2,
    borderWidth: 2,
    borderColor: colors.darkGray,
    borderStyle: 'dashed',
  },
  OuterCardWrapper: {
    // marginTop: 20,
    borderWidth: 2,
    borderColor: colors.darkGray,
  }
});
