import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Content, Spinner } from 'native-base'

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <Container>
        <View style={styles.container}>
          <Spinner />
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
