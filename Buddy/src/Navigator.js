import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Content, Button, Footer, FooterTab, StyleProvider } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, sharedStyles } from './assets/Theme';
import FoundScreen from './Screens/Found';
import FoundNav from './Screens/StackNavTrack';
import TrackScreen from './Screens/Track';
// import LogList from './Screens/LogList';
import ExploreScreen from './Screens/ExploreScreen';
import SearchScreen from './Screens/SearchScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ViewNav from './Screens/StackNavView';
import getTheme from '../native-base-theme/components';
import platform from '../native-base-theme/variables/platform';

export default (MainScreenNavigator = TabNavigator(
  {
    Explore: { screen: ViewNav },
    Search: { screen:  FoundNav }, //FoundNav
    Profile: { screen: ProfileScreen },
    // Track: { screen: TrackScreen },
    // Logs: { screen: LogList },
    //edit profile
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: props => {
      return (
        <StyleProvider style={getTheme(platform)}>
        <Footer >
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate('Explore')}>
              <Icon name='ios-compass' size={30}
              color={(props.navigationState.index === 0) ? colors.darkGray : colors.green}/>
            </Button>

            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate('Search')}>
              <Icon name='ios-camera' size={35}
              color={(props.navigationState.index === 1) ? colors.darkGray : colors.green}/>
            </Button>

            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate('Profile')}>
              <Icon name='md-contact' size={30}
              color={(props.navigationState.index === 2) ? colors.darkGray : colors.green}/>
            </Button>

          </FooterTab>
        </Footer>
        </StyleProvider>
      );
    }
  }
));
