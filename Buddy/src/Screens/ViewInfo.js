import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableHighlight, Alert } from 'react-native';
import { Container, Body, Content, Left, Right, Title, Input, Item, Label, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../selection.json';
const Icon2 = createIconSetFromIcoMoon(IcoMoonConfig);
import Header from '../Components/HeaderComponent';
import { colors, flavorColors, sharedStyles } from '../assets/Theme';
import { convert } from '../lib/TrackConverter';

class ViewInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
      title: 'LOG',
      headerRight: <Icon name="ios-cog" size={40}
        color={colors.green}
        onPress={() => navigation.navigate("Edit")}/>,
      headerStyle: sharedStyles.headerStyle,
      headerTitleStyle: sharedStyles.headerTitleStyle,
      headerBackTitleStyle: sharedStyles.headerBack,
      headerTintColor: sharedStyles.headerBackButton,
    });
  render() {
    const { navigate } = this.props.navigation;
    if (this.props.log) {
      const log = convert(this.props.log)
      return (
        <Container>
          <Content style={styles.formContentBody}>
            <ProductHeader product={log} />
            <ProductTrackInfo product={log} />
          </Content>
        </Container>
      )
    }
    return (
      <Container>
        <Content padder style={styles.formContentBody}>
          <Text>
            No Selected Log
          </Text>
        </Content>
      </Container>
    )
  }
};

function mapStateToProps(store) {
  return {
    log: store.logs.selectedLog,
   }
}

export default connect(mapStateToProps)(ViewInfoScreen);


class ProductHeader extends React.Component {
  render() {
    return (
      <View style={styles.HeaderContainer}>
        <View style={styles.TextContainer}>
          <Text style={styles.Header}>
            {this.props.product.name.toUpperCase()}
          </Text>
          <View style={styles.row}>
            <Text style={styles.SubHeader}>
              {this.props.product.brand ? this.props.product.brand.toUpperCase()+' ' : ''}
              <Icon2 name={"cannabis"} style={{color: "gray"}} size={20} />
              {' ' + this.props.product.product.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

class ProductTrackInfo extends React.Component {
  render () {
    const flavorCards = this.props.product.flavors.map((flavor, i) => {
      return <IconButton flavor={flavor} key={i} />
    })
    return (
      <View>
        <View style={styles.column}>
          <Text style={styles.label}>
            {this.props.product.date}
          </Text>
        </View>

        <View style={styles.row}>
          <BlockView label="Ranking" value={this.props.product.ranking} />
          <BlockView label="Quantity" value={this.props.product.quantity} />
        </View>
        <View style={styles.row}>
          <BlockView label="Activity" value={this.props.product.activity} />
          <BlockView label="Duration" value={this.props.product.duration} />
        </View>
        <View style={styles.column}>
            <Text style={styles.label}>
              Flavors
            </Text>
            <View style={styles.row}>
              {flavorCards}
            </View>
        </View>
      </View>
    )
  }
}

class BlockView extends React.Component {
  render() {
    let value = <Text style={styles.infoText}> {this.props.value} </Text>;
    if (this.props.label === "Activity") {
      value = <Icon name={this.props.value} size={30} color={colors.darkGray}/>;
    }
    return (
      <View style={styles.block}>
        <Text style={styles.label}>
          {this.props.label}
        </Text>

          {value}

      </View>
    )
  }
}

class IconButton extends React.Component {
  render() {
    const flavorIcon = {
      spicy: {icon: "food-2", color: colors.spicy},
      sweet: {icon:"food-1", color :colors.sweet},
      sour: {icon:"fruit", color: colors.sour},
      earthy: {icon:"forest", color: colors.earthy},
    }
    const color = flavorIcon[this.props.flavor].color;
    const icon = flavorIcon[this.props.flavor].icon;
      return (
        <View style={styles.iconButton}>
          <View
            style={[{backgroundColor: color}, styles.button]}>
            <Icon2 name={icon} style={{color: "white"}} size={40} />
          </View>
          <Text style={{color: color, fontWeight: "bold"}}>
            {this.props.flavor.toUpperCase()}
          </Text>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  formContentBody: {
    flex: 1,
    backgroundColor: colors.liteTan,
  },
  text: {
    fontFamily: 'Josefin Sans',
    fontWeight: "300",
    fontSize: 18,
  },
  label: {
    fontFamily: 'Crete Round',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginBottom: 10,
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  HeaderContainer: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: colors.darkGray,
    flexDirection: 'row',
    padding: 15,
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  Header: {
    fontWeight: '500',
    fontFamily: 'Josefin Sans',
    fontSize: 26,
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
  },
  iconButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    height: 80,
    width: 80,
    borderRadius:10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    margin: 10,
  },
  infoText: {
    fontFamily: 'Josefin Sans',
    fontWeight: '300',
    color: colors.darkGray,
    fontSize: 20,
  }
});
