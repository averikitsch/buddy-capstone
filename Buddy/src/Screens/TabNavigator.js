import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Content, Button, Footer, FooterTab, StyleProvider } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, sharedStyles } from '../assets/Theme';
import FoundScreen from './Found';
import FoundNav from './StackNavTrack';
import TrackScreen from './Track';
import ExploreScreen from './ExploreScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen';
import StackProfileNav from './StackProfileNav';
import ViewNav from './StackNavView';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';

export default (MainScreenNavigator = TabNavigator(
  {
    Explore: { screen: ViewNav },
    Search: { screen:  FoundNav }, //FoundNav
    Profile: { screen: StackProfileNav },
  },
  {
    initialRouteName: 'Explore',
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
