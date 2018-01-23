import React from 'react';
import { View, Image, StyleSheet, Text, Slider, Dimensions, TouchableHighlight, TextInput, AsyncStorage } from 'react-native';
import { Container, Content }  from 'native-base';
import { connect } from 'react-redux';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import IcoMoonConfig from '../selection.json';
const Icon = createIconSetFromIcoMoon(IcoMoonConfig);
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { colors, sharedStyles } from '../assets/Theme';
import { updateWish, deselectWish } from '../Actions/index';
import { product_props, product_map, duration_map, unit, units, quantityValues, date } from '../lib/TrackConverter';

class EditWishScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'EDIT',
    headerStyle: sharedStyles.headerStyle,
    headerTitleStyle: sharedStyles.headerTitleStyle,
    headerBackTitleStyle: sharedStyles.headerBack,
    headerTintColor: sharedStyles.headerBackButton,
  });
  render() {
    const { navigate } = this.props.navigation;
    // console.log(this.props.actions)
    return (
      <Container>
        <Content style={styles.formContentBody}>
          <ProductFormBody
            starterData={this.props.wish}  dispatch={this.props.actions}
            navigation={this.props.navigation}
          />
        </Content>
    </Container>
    );
  }
};

class ProductFormBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.starterData ? this.props.starterData.id : '',
      name: this.props.starterData ? this.props.starterData.name : '',
      brand: this.props.starterData ? this.props.starterData.brand : '',
      product: this.props.starterData ? this.props.starterData.product : 1,
      note: this.props.starterData ? this.props.starterData.note : '',
      date: this.props.starterData ? this.props.starterData.date : date(),
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.onPress = this.onPress.bind(this);
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
  handleNoteChange(note) {
    this.setState({
      note: note
    });
  }
  onPress(e) {
    e.preventDefault();
    const wish = this.state;
    console.log(wish)
    this.props.dispatch.updateWish(wish);
    this.props.dispatch.deselectWish();
    this.props.navigation.navigate("Logs");
  }
  render() {
    return (
      <View style={styles.formBody}>
        <View style={styles.inputLine}>
          <ProductFormHeader
            labelName="name"
            defaultValue={this.props.starterData}
          onNameChange={this.handleNameChange}/>
        </View>
        <View style={styles.inputLine}>
          <ProductFormHeader
            labelName="brand"
            defaultValue={this.props.starterData}
          onBrandChange={this.handleBrandChange}/>
        </View>
        <View style={styles.inputLine}>
          <RadioProductButton
          select={this.state.product} onProductChange={this.handleProductChange}/>
        </View>
        <View style={styles.inputLine}>
          <NoteBody data={this.state.note}
            defaultValue={this.props.starterData}
            onNoteChange={this.handleNoteChange}/>
        </View>
        <View style={styles.submitButtonLine}>
          <TouchableHighlight onPress={this.onPress}>
            <Text style={[sharedStyles.label, styles.submitButton]}>
              {"update!".toUpperCase()}
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
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  handleTextChange(text) {
    if (this.props.labelName === "name") {
      this.props.onNameChange(text);
    } else {
      this.props.onBrandChange(text);
    }
  }
  render() {
    const { labelName } = this.props;
    return (
      <View>
      <TextInput
      style={[sharedStyles.label,{height: 40}]}
      placeholder={labelName.toUpperCase()}
      onChangeText={this.handleTextChange}
      defaultValue={this.props.defaultValue ? this.props.defaultValue[labelName] : '' }
      />
      </View>
    )
  }
}

class RadioProductButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleProductChange = this.handleProductChange.bind(this);
  }
  handleProductChange(value) {
    this.props.onProductChange(value);
  }
  render() {
    return (
      <View>
        <Text style={sharedStyles.label}>
          {"Product Type:".toUpperCase()}
        </Text>
          <RadioForm
            formHorizontal={true}
            style={[styles.slider, styles.partialSlider]}
          >
          {product_map.map((obj) => {
            return (
            <RadioButton labelHorizontal={false} key={obj.value.toString()}>
            <RadioButtonInput
            obj={obj}
            index={obj.value}
            onPress={this.handleProductChange}
            buttonInnerColor={colors.green}
            buttonOuterColor={colors.green}
            isSelected={(obj.value == this.props.select)}
            />
            <RadioButtonLabel
            obj={obj}
            index={obj.value}
            labelHorizontal={false}
            onPress={this.handleProductChange}
            labelWrapStyle={{}}
            />
            </RadioButton>)
          })}
        </RadioForm>
      </View>
    );
  }
}

class NoteBody extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  handleTextChange(text) {
    this.props.onNoteChange(text);
  }
  render() {
    return (
      <View>
      <TextInput
        style={[sharedStyles.label,
          {
            height: 40,
            backgroundColor: 'rgba(48,	48,	46, 0.25)',
            paddingHorizontal: 10,
            height: 100,
            marginBottom: 20,
          }
        ]}
        multiline={true}
        numberOfLines = {4}
        placeholder={"Note".toUpperCase()}
        onChangeText={this.handleTextChange}
        defaultValue={this.props.defaultValue ? this.props.defaultValue.note : ''}
      />
      </View>
    )
  }
}


function mapStateToProps (store) {
  return {
    wish: store.wishlist.selectedWish,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions :{
      updateWish: log => dispatch(updateWish(log)),
      deselectWish: () => dispatch(deselectWish()),
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditWishScreen);

const styles = StyleSheet.create({
  formBody: {
    flex: 1,
    flexDirection: 'column',
  },
  formContentBody: {
    backgroundColor: colors.liteTan,
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
    color: colors.darkGray,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: colors.darkGray,
    borderWidth: 2,
    marginBottom: 30,
  },
  submitButtonLine: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
