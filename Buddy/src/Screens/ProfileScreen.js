import React from 'react';
import { AppRegistry, View, StatusBar, Image, StyleSheet } from 'react-native';
import { Container, Header, Tab, Tabs, Text, ScrollableTab, Thumbnail, Title, StyleProvider, Button, Right } from 'native-base';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import Icon from 'react-native-vector-icons/Ionicons';
import BuddyHeader from '../Components/HeaderComponent';
import FlavorCard from '../Components/ProfileCards/FlavorCard';
import TypeCard from '../Components/ProfileCards/TypeCard';
import ProductCard from '../Components/ProfileCards/ProductCard';
import UsageCard from '../Components/ProfileCards/UsageCard';
import { colors, sharedStyles } from '../assets/Theme'

class ProfileScreen extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: 'PROFILE',
  //   headerStyle: sharedStyles.headerStyle,
  //   headerTitleStyle: sharedStyles.headerTitleStyle,
  // });
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
  }
  logOut (e) {
    e.preventDefault();
    Auth.signOut()
      .then((data) => {
        console.log(data)
        this.props.navigation.navigate('Explore');
      })
      .catch(err => console.log(err));
  }
  render() {
    // const { navigate } = this.props.navigation;
    // <BuddyHeader name="Profile" />
    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <Header>
        <Right>
          <Button small rounded dark onPress={this.logOut}>
            <Text>logout</Text>
          </Button>
        </Right>
        </Header>
        <View style={styles.ProfileContainer}>
          <View style={styles.ProfileHeaderContainer}>
            <ProfileLinks
              navigation={this.props.navigation}
              name={this.props.name}
            />
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

function mapStateToProps (store) {
  return {
    name: store.user.username
  }
}

export default connect(mapStateToProps)(ProfileScreen)

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
          <Title style={styles.ProfileName}>
            {this.props.name}
          </Title>

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
    paddingTop: 10,
    fontFamily: 'Josefin Sans',
    fontSize: 24,
    color: colors.green,
    fontWeight: 'bold',
  },
  ProfileLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 40,
  },
  ProfileHeaderContainer: {
    flex: 2,
    backgroundColor: colors.lightGreen,
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
