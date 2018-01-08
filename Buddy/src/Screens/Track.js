import React from 'react';
import { View, Image, StyleSheet, Text, Slider, Dimensions, TouchableHighlight, TextInput } from 'react-native';
import { Container, Body, Content, Left, Right, Title, Input, Item, Form, Label, Button, Picker }  from 'native-base';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import BuddyHeader from '../Components/HeaderComponent';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../selection.json';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';



export default class TrackScreen extends React.Component {
  render() {
    // const { navigate } = this.props.navigation;
    return (
      <Container>
      <BuddyHeader name="Track" />
        <Content>
          <ProductFormBody />
        </Content>
    </Container>
    );
  }
};

class ProductFormBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      brand: '',
      product: 'flower',
      quantity: 0,
      flavors: [],
      activity: 0,
      duration: 0,
      ranking: 0,
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
  }
  handleNameChange(name) {
    this.setState({
      name: name
    });
  }
  handleBrandChange(brand) {
    this.setState({
      brand: brand
    });
  }
  handleProductChange(product) {
    this.setState({
      product: product
    });
  }
  onPress() {

  }
  render() {
    return (
      <View style={styles.formBody}>

        {/*<View style={styles.ImageContainer}>
          <Image style={styles.image} source={require('../assets/temp.jpeg')} />
        </View>*/}
        <View style={styles.inputLine}>
          <ProductFormHeader labelName="name" onNameChange={this.handleNameChange}/>
        </View>
        <View style={styles.inputLine}>
          <ProductFormHeader labelName="brand" onBrandChange={this.handleBrandChange}/>
        </View>
        <View style={styles.inputLine}>
          <RadioProductButton onProductChange={this.handleProductChange}/>
        </View>
        <View style={styles.inputLine}>
          <QuantityPicker type={this.state.product}/>
        </View>
        <View style={styles.inputLine}>
          <RadioIconButton />
        </View>
        <View style={styles.inputLine}>
          <ActivityPicker />
        </View>
        <View style={styles.inputLine}>
          <RadioDurationButton />
        </View>
        <View style={styles.inputLine}>
          <RadioRankButton />
        </View>
        <View style={styles.submitButtonLine}>
          <TouchableHighlight onPress={this.onPress}>
            <Text style={[styles.label, styles.submitButton]}>
              {"add!".toUpperCase()}
            </Text>
          </TouchableHighlight>
        </View>
        </View>

    )
  }
}

class ProductFormHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    return (
      <View>
      <TextInput
      style={[styles.label,{height: 40}]}
      placeholder={this.props.labelName.toUpperCase()}
      onChangeText={(text) => this.setState({text})}
      />
      </View>
    )
  }
}

class RadioProductButton extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    }
  }
  render() {
    const duration_props = [
      {label: 'Flower', value: 1 },
      {label: 'Pre-roll', value: 2 },
      {label: 'Extract', value: 3 },
      {label: 'Vape', value: 4 },
      {label: 'Edible', value: 5 },
    ];
    return (
      <View>
        <Text style={styles.label}>
          {"Product Type:".toUpperCase()}
        </Text>
        <RadioForm
          radio_props={duration_props}
          initial={0}
          formHorizontal={true}
          labelHorizontal={false}
          buttonColor={'#2196f3'}
          animation={true}
          style={[styles.slider, styles.partialSlider]}
          onPress={(value) => {this.setState({value:value})}}
          />
      </View>
    );
  }
}

class QuantityPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }
  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }
  render() {
    const {value} = this.state;
    const unit = {
      flower: "bowl",
      extract: "dab",
      preroll: "g joint",
      vape: "pull",
      edible: "mg",
    }
    const units = {
      flower: "bowls",
      extract: "dabs",
      preroll: "g joint",
      vape: "pulls",
      edible: "mg",
    }
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{"Quantity: ".toUpperCase() + String(value)+" "+ ((value !== 1) ? units[this.props.type] : unit[this.props.type])}</Text>
        <Slider
          step={1}
          maximumValue={5}
          onValueChange={this.change.bind(this)}
          value={value}
          style={styles.partialSlider}
        />
      </View>
    );
  }
}

class ActivityPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 5,
    };
  }
  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }
  render() {
    const {value} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{"Activity:".toUpperCase()}</Text>
        <View style={styles.slider}>
        <Icon name="bed" size={25}/>
        <Slider
          step={1}
          maximumValue={10}
          onValueChange={this.change.bind(this)}
          value={value}
          style={styles.partialSlider}
        />
        <Icon name="jumping-dancer" size={25}/>
        </View>
      </View>
    );
  }
}

class RadioIconButton extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.label}>
          {"Flavors:".toUpperCase()}
        </Text>
        <View style={styles.radioButtons}>
          <IconButton flavor="spicy"  />
          <IconButton flavor="sour"/>
          <IconButton flavor="sweet"/>
          <IconButton flavor="earthy" />
        </View>
      </View>
    )
  }
}

class IconButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      onClicked: false
    }
    this.handlerButtonOnClick = this.handlerButtonOnClick.bind(this);
  }
  handlerButtonOnClick(){
    this.setState({
       onClicked: !this.state.onClicked
    });
  }
  render() {
    const flavorIcon = {
      spicy: {icon: "food-2", color:"red"},
      sweet: {icon:"food-1", color:"blue"},
      sour: {icon:"fruit", color:"yellow"},
      earthy: {icon:"forest", color:"green"},
    }
    const color = flavorIcon[this.props.flavor].color;
    const icon = flavorIcon[this.props.flavor].icon;
    if (this.state.onClicked) {
      return (
        <View style={styles.iconButton}>
          <TouchableHighlight
          style={[{borderColor: color, borderWidth: 5}, styles.button]}
          onPress={this.handlerButtonOnClick}>
            <Icon name={icon} style={{color: color}} size={40} />
          </TouchableHighlight>
          <Text style={{color: color, fontWeight: "bold"}}>
            {this.props.flavor.toUpperCase()}
          </Text>
        </View>
      )
    } else {
      return (
        <View style={styles.iconButton}>
          <TouchableHighlight
            style={[{backgroundColor: color}, styles.button]}
            onPress={this.handlerButtonOnClick}>
            <Icon name={icon} style={{color: "white"}} size={40} />
          </TouchableHighlight>
          <Text style={{color: color, fontWeight: "bold"}}>
            {this.props.flavor.toUpperCase()}
          </Text>
        </View>
      )
    }
  }
}

class RadioDurationButton extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
    }
  }
  render() {
    const duration_props = [
      {label: '< 1 hr', value: 0 },
      {label: '1-2 hr', value: 1 },
      {label: '3+ hr', value: 2 },
    ];
    return (
      <View>
        <Text style={styles.label}>{"Duration:".toUpperCase()}</Text>
        <RadioForm
          radio_props={duration_props}
          initial={0}
          formHorizontal={true}
          labelHorizontal={true}
          buttonColor={'#2196f3'}
          animation={true}
          style={[styles.slider, styles.partialSlider]}
          onPress={(value) => {this.setState({value:value})}}
          />
      </View>
    );
  }
}

class RadioRankButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 2,
    };
  }
  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }
  render() {
    const {value} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{"Ranking:".toUpperCase()}</Text>
        <View style={styles.slider}>
        <Icon2 name="thumbs-down" size={25}/>
        <Slider
          step={1}
          maximumValue={4}
          onValueChange={this.change.bind(this)}
          value={value}
          style={styles.partialSlider}
        />
        <Icon2 name="thumbs-up" size={25}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formBody: {
    flex: 1,
    flexDirection: 'column',
  },
  inputLine: {
    flex: 1,
    padding: 10,
  },
  ImageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  label: {
    fontFamily: 'Crete Round',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
  productTypes: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  slider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  partialSlider: {
    width: Dimensions.get('window').width * 0.75 ,
    alignSelf: 'center',
  },
  iconButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  submitButton: {
    backgroundColor: "blue",
  },
  submitButtonLine: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
