import React from 'react';
import { AppRegistry, View, StatusBar, Image, StyleSheet } from 'react-native';
import { Container, Header, Tab, Tabs, Text, ScrollableTab, Thumbnail, Title } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import BuddyHeader from './HeaderComponent';
import FlavorCard from './FlavorCard';
import TypeCard from './TypeCard';
import ProductCard from './ProductCard';
import UsageCard from './UsageCard';
import LogList from './LogList';

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
          <Tab heading="Flavor" style={styles.Card}>
            <FlavorCard />
          </Tab>
          <Tab heading="Type" >
            <TypeCard />
          </Tab>
          <Tab heading="Products">
            <ProductCard />
          </Tab>
          <Tab heading="Usage">
            <UsageCard />
          </Tab>
          <Tab heading="Logs">
            <LogList />
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
    padding: 0,
    margin: 10,
  }
})
