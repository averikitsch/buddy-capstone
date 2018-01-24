import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { Container, Body, Content, Left, Right, Title, Input, Item, Label, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../Components/HeaderComponent';
import { colors, flavorColors, sharedStyles } from '../assets/Theme';
import { addWish } from '../Actions/index';
import { date, product2num } from '../lib/TrackConverter'

class FoundScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'FOUND',
    headerStyle: sharedStyles.headerStyle,
    headerTitleStyle: sharedStyles.headerTitleStyle,
    headerBackTitleStyle: sharedStyles.headerBack,
    headerTintColor: sharedStyles.headerBackButton,
  });
  constructor() {
    super();
    this.onWishlistPress = this.onWishlistPress.bind(this);
  }
  onWishlistPress(e) {
    e.preventDefault();
    console.log("wish", this.props)
    this.props.addWish({
      name: this.props.found.name,
      brand: undefined,
      product: undefined,
      date: date()
    });
    this.props.navigation.navigate("Explore");
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Content style={styles.formContentBody}>
          <ProductHeader product={this.props.found}/>
          <View style={styles.Buttons}>
          <TouchableHighlight style={styles.Button}
            onPress={() => navigate("Track", this.props.found)}>
            <Text style={styles.label}>{"track".toUpperCase()}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.Button}
            onPress={this.onWishlistPress}>
            <Text style={styles.label}>{"wishlist".toUpperCase()}</Text>
          </TouchableHighlight>
          </View>
          <View style={styles.ImageContainer}>
            <Image style={styles.image} source={require('../assets/images/topo.png')} />
          </View>
          <ProductBody product={this.props.found} />
      </Content>
    </Container>
    );
  }
};

function mapStateToProps (store) {
  return {
    found: store.search.found,
  }
}

function mapDispatchToProps (dispatch) {
  return {
      addWish: wish => dispatch(addWish(wish))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(FoundScreen);


class ProductHeader extends React.Component {
  render() {
    console.log(this.props.product)
    return (
      <View style={styles.HeaderContainer}>
        <View style={styles.TextContainer}>
          <Text style={styles.Header}>
            {this.props.product ? this.props.product.name.toUpperCase() : ''}
          </Text>
        </View>
      </View>
    )
  }
}


class ProductBody extends React.Component {
  render() {
    if (Object.keys(this.props.product).length > 1) {
    const types = {
      hybrid: "ios-happy-outline",
      sativa: "ios-headset-outline",
      indica: "ios-body-outline"
    };
    const product = this.props.product;
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.detailContainer}>
          <View style={styles.type}>
            <Icon name={types[product.race]} size={35} />
          </View>
          <View style={styles.cross}>
          <Text style={styles.text}>
            {product.race.toUpperCase()}
          </Text>
          </View>
        </View>
        <View style={styles.description}>
          <Text style={styles.text}>
          {product.desc}</Text>
        </View>

          <View style={styles.flavorCards}>
            {product.flavors.map((flavor, i) => {
              return <FlavorCard flavor={flavor} key={i.toString()} />
            })}
          </View>

          <View style={styles.OuterCardWrapper}>
          <View style={styles.CardWrapper}>
          <View style={styles.cardStack}>
            <View style={styles.effectCards}>
              <Icon name="md-add" size={35} color={`hsl(241, 41%, 43%)`} style={styles.effectIcon}/>
                {product.effects.positive.map((effect, i) => {
                  return <EffectCard effect={effect} key={i.toString()} iter={i} type="positive"/>
                })}
            </View>
            <View style={styles.effectCards}>
              <Icon name="md-remove" size={35} color={`hsl(360, 51%, 43%)`} style={styles.effectIcon}/>
              {product.effects.negative.map((effect, i) => {
                return <EffectCard effect={effect} key={i.toString()} iter={i} type="negative"/>
              })}
            </View>
            <View style={styles.effectCards}>
              <Icon name="ios-medical" size={35} color={`hsl(139, 41%, 41%)`} style={styles.effectIcon}/>
              {product.effects.medical.map((effect, i) => {
                return <EffectCard effect={effect} key={i.toString()} iter={i} type="medical"/>
              })}
            </View>
          </View>
        </View>
      </View>
      </View>
    )
  } else {
    return (
      <View style={styles.bodyContainer}>
        <Text style={styles.text}>Sorry, we are unable to find this strain in our database.</Text>
      </View>
    )
  }
  }
}

class FlavorCard extends React.Component {
  render() {
    const color = flavorColors[this.props.flavor];
    return (
      <View style={[styles.flavorCard, {backgroundColor: color}]}>
        <Text style={[styles.flavorText]}>
          {this.props.flavor}
        </Text>
      </View>
    )
  }
}

class EffectCard extends React.Component {
  render() {
    let color;
    if (this.props.type === "negative") {
      color = `hsl(360, 51%, ${36 + this.props.iter * 7}%)`;
    } else if (this.props.type === "positive") {
      color = `hsl(241, 41%, ${36 + this.props.iter * 7}%)`;
    } else {
      color = `hsl(139, 41%, ${36 + this.props.iter * 5}%)`;
    }
    return (
      <View style={[styles.effectCard, {backgroundColor: color}]}>
        <Text style={[styles.flavorText]}>
          {this.props.effect}
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
    padding: 15,
  },
  text: {
    fontFamily: 'Josefin Sans',
    fontWeight: "300",
    fontSize: 18,
    textAlign: 'justify',
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
    justifyContent: 'center',
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
    padding: 3,
    margin: 10,
    height: 80,
    width: 80,
    borderRadius: 10,
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
    flex: 1,
    // flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  cardStack: {
    flex: 1,
    flexDirection: 'row',
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
    // borderWidth: 2,
    // borderColor: colors.darkGray,
    // borderStyle: 'dashed',
  },
  OuterCardWrapper: {
    // marginTop: 20,
    // borderWidth: 2,
    // borderColor: colors.darkGray,
  }
});
