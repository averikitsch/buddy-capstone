/* eslint-disable */
import React, { Component } from "react";
import ExploreScreen from "./src/ExploreScreen.js";
import SearchScreen from "./src/SearchScreen.js";
import ProfileScreen from "./src/ProfileScreen.js";
import { TabNavigator } from "react-navigation";
import { Button, Text, Footer, FooterTab } from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';

export default (MainScreenNavigator = TabNavigator(
  {
    ExploreScreen: { screen: ExploreScreen },
    SearchScreen: { screen: SearchScreen },
    ProfileScreen: { screen: ProfileScreen }
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
              onPress={() => props.navigation.navigate("ExploreScreen")}>
              <Icon name="ios-compass" size={30} />
            </Button>

            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("SearchScreen")}>
              <Icon name="ios-camera" size={35} />
            </Button>

            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("ProfileScreen")}>
              <Icon name="md-contact" size={30} />
            </Button>
            
          </FooterTab>
        </Footer>
      );
    }
  }
));
