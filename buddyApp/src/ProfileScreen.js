import React from 'react';
import { AppRegistry, View, StatusBar, Image, StyleSheet } from 'react-native';
import { Container, Header, Tab, Tabs, Text, ScrollableTab, Thumbnail, Title } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import BuddyHeader from './HeaderComponent';
import FlavorCard from './FlavorCard';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <Container>
        <BuddyHeader name="Profile" />
        <View style={styles.ProfileContainer}>
          <View style={styles.ProfileHeaderContainer}>
            <ProfileLinks />
          </View>
          <View style={styles.TabContainer}>
            <TabsScrollable />
          </View>
        </View>
      </Container>
    );
  }
};

class ProfileLinks extends React.Component {
  render() {
    return (
      <Container>
        <View style={styles.ProfileHeader}>
          <Thumbnail large source={require('../assets/temp.jpeg')} />
          <Title style={styles.ProfileName}>Name</Title>
        </View>
      </Container>
    )
  }
}

class TabsScrollable extends React.Component {
  render() {
    return (
      <Container>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="Tab1" style={styles.Card}>
            <FlavorCard />
          </Tab>
          <Tab heading="Tab2" style={styles.Card}>
            <Text>Tab 2!</Text>
          </Tab>
          <Tab heading="Tab3">
            <Text>Tab 3!</Text>
          </Tab>
          <Tab heading="Tab4">
            <Text>Tab 4!</Text>
          </Tab>
          <Tab heading="Tab5">
            <Text>Tab 5!</Text>
          </Tab>
        </Tabs>
      </Container>
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
    alignItems: 'center',
    paddingTop: 50,
  },
  ProfileName: {
    fontWeight: 'bold',
    paddingTop: 10,
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
    // alignItems: 'center',
    // alignSelf: 'center',
    padding: 5,
  }
})
