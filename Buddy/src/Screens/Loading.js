import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Container, Content, Spinner } from 'native-base'
import { colors } from '../assets/Theme';

export default class LoadingScreen extends React.Component {
  render() {
    return (
      <Container>
        <View style={styles.container}>
        <Image
          style={{
            backgroundColor: colors.green,
            flex: 1,
            resizeMode: 'cover',
            position: 'absolute',
            // width: '100%',
            height: Dimensions.get('window').height,
            justifyContent: 'center',
          }}
          source={require('../assets/images/full_topo.png')}
        />
          <Text
            style={{
              backgroundColor: 'transparent',
              color: colors.darkGray,
              textAlign: 'center',
              fontSize: 36,
              padding: 40,
              fontFamily: 'Josefin Sans',
              fontWeight: 'bold',
            }}
          >
            BUDDY
          </Text>
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
    backgroundColor: colors.liteTan,
  }
});
