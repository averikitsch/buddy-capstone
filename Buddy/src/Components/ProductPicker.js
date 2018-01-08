class ProductPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
      <Container>
      <Picker
        mode="dropdown"
        placeholder="PRODUCT TYPE"
        iosHeader="TYPE"
        textStyle={styles.label}
        selectedValue={this.state.selected}
        onValueChange={this.onValueChange.bind(this)}
      >
        <Item label="Flower" value="flower" />
        <Item label="Joint Pre-roll" value="preroll" />
        <Item label="Extract" value="extract" />
        <Item label="Vape" value="vape" />
        <Item label="Edible" value="edible" />
      </Picker>
      </Container>
    )
  }
}
