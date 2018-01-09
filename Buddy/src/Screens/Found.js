import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { Container, Body, Content, Left, Right, Title, Input, Item, Label, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../Components/HeaderComponent';
import { colors, flavorColors } from '../assets/Theme';

const testObj = {
  name: 'Seatown Lemon Haze',
  brand: 'Dawg Star',
  product: 'Flower',
  type: 'sativa',
  cross: ['Lemon Skunk', 'Super Silver Haze'],
  description: 'Gather your friends, strap on your explorer boots, don your chef hat, or unleash your inner artist – our Seatown Lemon Haze, also known as Super Lemon Haze, offers a creative, social and energetic high to get you ready for a moment of exploration or creativity.',
  image: '../assets/images/temp.jpeg',
  flavors: [
    "Lemon",
    "Citrus",
    "Sage"
    ],
  effects: {
    positive: [
    "Euphoric",
    "Creative",
    "Energetic",
    "Uplifted"
    ],
    negative: [
    "Dry Mouth"
    ],
    medical: [
    "Depression",
    "Insomnia",
    "Pain",
    "Fatigue",
    "Inflammation"
    ]
  }
};


export default class FoundScreen extends React.Component {
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <Container>
      <Header />
        <Content style={styles.formContentBody}>
          <ProductHeader name={testObj.name} brand={testObj.brand} product={testObj.product} image={testObj.image}/>
          <View style={styles.Buttons}>
          <TouchableHighlight style={styles.Button}
            onPress={() => navigate("Track")}>
            <Text style={styles.label}>{"track".toUpperCase()}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.Button}>
            <Text style={styles.label}>{"wishlist".toUpperCase()}</Text>
          </TouchableHighlight>
          </View>
          <View style={styles.ImageContainer}>
            <Image style={styles.image} source={require('../assets/images/topo.png')} />
          </View>
          <ProductBody obj={testObj} />


      </Content>
    </Container>
    );
  }
};

class ProductHeader extends React.Component {
  render() {
    return (
      <View style={styles.HeaderContainer}>
        {/*<View style={styles.ImageContainer}>
          <Image style={styles.image} source={require('../assets/images/temp.jpeg')} />
        </View>*/}
        <View style={styles.TextContainer}>
          <Text style={styles.Header}>
            {this.props.name.toUpperCase()}
          </Text>
          <Text style={styles.SubHeader}>
            {this.props.brand.toUpperCase()}
          </Text>
          <Text style={styles.SubHeader}>
            {this.props.product.toUpperCase()}
          </Text>

        </View>
      </View>
    )
  }
}


class ProductBody extends React.Component {
  render() {
    const types = {
      hybrid: "ios-happy-outline",
      sativa: "ios-headset-outline",
      indica: "ios-body-outline"
    };
    return (
      <View style={styles.bodyContainer}>
        <View style={styles.detailContainer}>
          <View style={styles.type}>
            <Icon name={types[this.props.obj.type]} size={35} />
            <Text style={styles.text}>
              {this.props.obj.type}
            </Text>
          </View>
          <View style={styles.cross}>
            <Text style={styles.text}>
            {this.props.obj.cross[0]}</Text>
            <Text style={styles.text}>
            {this.props.obj.cross[1]}</Text>
          </View>
        </View>
        <View style={styles.description}>
          <Text style={styles.text}>
          {this.props.obj.description}</Text>
        </View>
        <View>
          <Text style={styles.label}>
          Flavors:
          </Text>
          <View style={styles.flavorCards}>
            {this.props.obj.flavors.map((flavor) => {
              return <FlavorCard flavor={flavor} />
            })}
          </View>
        </View>
        <View>
          <Text style={styles.label}>
          Effects:
          </Text>
          <View style={styles.effectCards}>
            {this.props.obj.effects.positive.map((effect) => {
              return <EffectCard effect={effect} />
            })}
          </View>
        </View>
      </View>
    )
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
    const color = 'hsl(120, 60%, 70%)';
    return (
      <View style={[styles.effectCard, {backgroundColor: color}]}>
        <Text style={[styles.effectText]}>
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
  }
});