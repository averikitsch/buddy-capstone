import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Button, Footer, FooterTab, StyleProvider } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../assets/Theme';

// Screens
import FoundNav from './StackNavTrack';
import StackProfileNav from './StackProfileNav';
import ViewNav from './StackNavView';
// Theme
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';

export default (MainScreenNavigator = TabNavigator(
  {
    Explore: { screen: ViewNav },
    Search: { screen:  FoundNav },
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
              <Icon name='ios-archive' size={40}
              color={(props.navigationState.index === 0) ? colors.darkGray : colors.green}/>
            </Button>

            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate('Search')}>
              <Icon name='ios-compass' size={35}
              color={(props.navigationState.index === 1) ? colors.darkGray : colors.green}/>
            </Button>

            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate('Profile')}>
              <Icon name='md-contact' size={35}
              color={(props.navigationState.index === 2) ? colors.darkGray : colors.green}/>
            </Button>

          </FooterTab>
        </Footer>
        </StyleProvider>
      );
    }
  }
));
