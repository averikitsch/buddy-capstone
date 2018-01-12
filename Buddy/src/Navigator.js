import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Button, Footer, FooterTab } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import FoundScreen from './Screens/Found';
import FoundNav from './Screens/StackNavTrack';
import TrackScreen from './Screens/Track';
// import LogList from './Screens/LogList';
import ExploreScreen from './Screens/ExploreScreen';
import SearchScreen from './Screens/SearchScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ViewNav from './Screens/StackNavView';

export default (MainScreenNavigator = TabNavigator(
  {
    Explore: { screen: ViewNav },
    Search: { screen:  FoundNav }, //FoundNav
    Profile: { screen: ProfileScreen },
    Track: { screen: TrackScreen },
    // Logs: { screen: LogList },
    //edit profile
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate('Explore')}>
              <Icon name='ios-compass' size={30} />
            </Button>

            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate('Search')}>
              <Icon name='ios-camera' size={35} />
            </Button>

            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate('Profile')}>
              <Icon name='md-contact' size={30} />
            </Button>

          </FooterTab>
        </Footer>
      );
    }
  }
));
