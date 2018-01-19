import React from 'react';
import { AppRegistry, View, StatusBar, Image, StyleSheet } from 'react-native';
import { Container, Header, Tab, Tabs, Text, ScrollableTab, Thumbnail, Title, StyleProvider, Right, Button } from 'native-base';
import { NavigationActions } from 'react-navigation';
import Amplify, { Auth } from 'aws-amplify-react-native';
import aws_exports from '../aws-exports';
Amplify.configure(aws_exports);
import { connect } from 'react-redux';
import {  purgeStoredState } from 'redux-persist';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
import Icon from 'react-native-vector-icons/Ionicons';
import BuddyHeader from '../Components/HeaderComponent';
import FlavorCard from '../Components/ProfileCards/FlavorCard';
import TypeCard from '../Components/ProfileCards/TypeCard';
import ProductCard from '../Components/ProfileCards/ProductCard';
import UsageCard from '../Components/ProfileCards/UsageCard';
import { colors, sharedStyles } from '../assets/Theme'
import { logout } from '../Actions/index'
import { AsyncStorage } from 'react-native'
import axios from 'axios';

class ProfileScreen extends React.Component {
  // static navigationOptions = ({ navigation }) => ({
  //   title: 'PROFILE',
  //   headerStyle: sharedStyles.headerStyle,
  //   headerTitleStyle: sharedStyles.headerTitleStyle,
  // });

  render() {
    // const { navigate } = this.props.navigation;
    // <BuddyHeader name="Profile" />
    return (
      <StyleProvider style={getTheme(platform)}>
      <Container>
        <View style={styles.ProfileContainer}>
          <View style={styles.ProfileHeaderContainer}>
            <ProfileLinks
              navigation={this.props.navigation}
              name={this.props.name}
              logId={this.props.logId}
              data={{LogList: this.props.logs, WishList: this.props.wishlist}}
              dispatch={this.props.onLogOut}
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
    name: store.user.username,
    logId: store.user.logId,
    logs: store.logs.logs,
    wishlist: store.wishlist.wishlist,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onLogOut: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)

class ProfileLinks extends React.Component {
  logout(e) {
    e.preventDefault();
    const url = `http:localhost:8000/users/${this.props.logId}`;
    console.log(this.props.data)
    axios.put( url, this.props.data)
      .then((response) => {
        console.log('put', response)
        purgeStoredState({storage: AsyncStorage})
          .then(() => {
            console.log('purge completed')
          })
          .catch(() => {
            console.log('purge of someReducer failed')
          })
        Auth.signOut()
          .then((data) => {
            console.log('sign out', data)
          });
        this.props.dispatch();
            // const resetAction = NavigationActions.reset({
            //   index: 0,
            //   actions: [
            //     NavigationActions.navigate({ routeName: 'Login' }),
            //   ],
            // });
            // this.props.navigation.dispatch(resetAction);
          // })
    // ;
    }).catch(err => console.log('logout err', err));
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <View style={styles.ProfileLinkContainer}>
          <View style={styles.ProfileHeader}>
            <Thumbnail large source={require('../assets/images/temp.jpeg')} />
            <Title style={styles.ProfileName}>{this.props.name}</Title>
            <Button small rounded dark
              onPress={this.logout.bind(this)}>
              <Text>logout</Text>
            </Button>
          </View>
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
    paddingBottom: 10,
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
