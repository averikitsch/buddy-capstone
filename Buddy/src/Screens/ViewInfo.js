import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableHighlight, Alert } from 'react-native';
import { Container, Body, Content, Left, Right, Title, Input, Item, Label, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../Components/HeaderComponent';
import { colors, flavorColors } from '../assets/Theme';
import { convert } from '../lib/TrackConverter';

class ViewInfoScreen extends React.Component {
  // const { navigate } = this.props.navigation;
  static navigationOptions = ({ navigation }) => ({
      title: 'Log',
      headerRight: <Icon name="ios-cog" size={40}
        onPress={() => navigation.navigate("Edit")}/>,
    });
  render() {
    console.log('prop', this.props.log);
    const log = convert(this.props.log)
    console.log('log', log)
    const { navigate } = this.props.navigation;
    return (
      <Container>

        <Content padder style={styles.formContentBody}>
        <ProductHeader product={log} />
          <ProductTrackInfo product={log} />
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
        {/*<View style={styles.ImageContainer}>
          <Image style={styles.image} source={require('../assets/images/temp.jpeg')} />
        </View>*/}
        <View style={styles.TextContainer}>
          <Text style={styles.Header}>
            {this.props.product.name.toUpperCase()}
          </Text>
          <Text style={styles.SubHeader}>
            {this.props.product.brand.toUpperCase()}
          </Text>
          <Text style={styles.SubHeader}>
            {this.props.product.product.toUpperCase()}
          </Text>

        </View>
      </View>
    )
  }
}

class ProductTrackInfo extends React.Component {
  render () {
    console.log(this.props.product)
    const flavorCards = this.props.product.flavors.map((flavor, i) => {
      console.log(flavor);
      <IconButton flavor={flavor} key={i} />
    })
    return (
      <View>
      <Text style={styles.label}>
        {this.props.product.date}
      </Text>
        <Text style={styles.label}>
          Ranking: {this.props.product.ranking}
        </Text>
        <Text style={styles.label}>
          Quantity: {this.props.product.quantity}
        </Text>
        <Text style={styles.label}>
          Flavors: {flavorCards}
        </Text>

        <Text style={styles.label}>
          Activity: {this.props.product.activity}
        </Text>
        <Text style={styles.label}>
          Duration: {this.props.product.duration}
        </Text>
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
    console.log(icon);
      return (
        <View style={styles.iconButton}>
          <View
            style={[{backgroundColor: color}, styles.button]}
            onPress={this.handlerButtonOnClick}>
            <Icon name={icon} style={{color: "white"}} size={40} />
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
