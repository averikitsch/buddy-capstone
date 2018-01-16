import React from 'react';
import { AppRegistry, View, StatusBar, Image, StyleSheet } from 'react-native';
import { Container, Header, Tab, Tabs, Text, ScrollableTab, Thumbnail, Title, StyleProvider } from 'native-base';
import { connect } from 'react-redux';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import Icon from 'react-native-vector-icons/Ionicons';
import BuddyHeader from '../Components/HeaderComponent';
import FlavorCard from '../Components/ProfileCards/FlavorCard';
import TypeCard from '../Components/ProfileCards/TypeCard';
import ProductCard from '../Components/ProfileCards/ProductCard';
import UsageCard from '../Components/ProfileCards/UsageCard';
import { sharedStyles } from '../assets/Theme'

export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'PROFILE',
    headerStyle: sharedStyles.headerStyle,
    headerTitleStyle: sharedStyles.headerTitleStyle,
  });
  render() {
    // const { navigate } = this.props.navigation;
    // <BuddyHeader name="Profile" />
    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <View style={styles.ProfileContainer}>
          <View style={styles.ProfileHeaderContainer}>
            <ProfileLinks navigation={this.props.navigation}/>
          </View>
          <View style={styles.TabContainer}>
            <TabsScrollable />
          </View>
        </View>
      </Container>
      </StyleProvider>
    );
  }
};

class ProfileLinks extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <View style={styles.ProfileLinkContainer}>
          {/*<Icon name="ios-list-box" size={35}
          onPress={() => navigate("Logs")} />*/}
        <View style={styles.ProfileHeader}>
          <Thumbnail large source={require('../assets/images/temp.jpeg')} />
          <Title style={styles.ProfileName}>Name</Title>
        </View>
          {/*<Icon name="ios-cog" size={40} />*/}
        </View>
      </Container>
    )
  }
}

class TabsScrollable extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="Flavor" style={styles.Card}>
            <FlavorCard />
          </Tab>
          <Tab heading="Type" style={styles.Card}>
            <TypeCard />
          </Tab>
          <Tab heading="Products" style={styles.Card}>
            <ProductCard />
          </Tab>
          <Tab heading="Usage" style={styles.Card}>
            <UsageCard />
          </Tab>
        </Tabs>
      </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  ProfileContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  ProfileHeader: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  ProfileName: {
    fontWeight: 'bold',
    paddingTop: 10,
  },
  ProfileLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 40,
  },
  ProfileHeaderContainer: {
    flex: 2,
  },
  TabContainer: {
    flex: 4,
  },
  Card: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 0,
    margin: 10,
  }
})
