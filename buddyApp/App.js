/* eslint-disable */
import React, { Component } from "react";
import ExploreScreen from "./src/ExploreScreen.js";
import SearchScreen from "./src/SearchScreen.js";
import ProfileScreen from "./src/ProfileScreen.js";
import { TabNavigator } from "react-navigation";
import { Button, Text, Footer, FooterTab } from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';
import FoundScreen from "./src/Found";
import TrackScreen from './src/Track';
import LogList from './src/ProfileCards/LogList';

export default (MainScreenNavigator = TabNavigator(
  {
    Explore: { screen: FoundScreen },
    Search: { screen: SearchScreen },
    Profile: { screen: ProfileScreen },
    Track: { screen: TrackScreen },
    Logs: { screen: LogList },
    //edit profile
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("Explore")}>
              <Icon name="ios-compass" size={30} />
            </Button>

            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Search")}>
              <Icon name="ios-camera" size={35} />
            </Button>

            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("Profile")}>
              <Icon name="md-contact" size={30} />
            </Button>

          </FooterTab>
        </Footer>
      );
    }
  }
));
