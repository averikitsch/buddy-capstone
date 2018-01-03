/* eslint-disable */
import React, { Component } from "react";
import ExploreChat from "./src/ExploreScreen.js";
import SearchChat from "./src/SearchScreen.js";
import ProfileChat from "./src/ProfileScreen.js";
import { TabNavigator } from "react-navigation";
import { Button, Text, Footer, FooterTab } from "native-base";
import Icon from 'react-native-vector-icons/Ionicons';
export default (MainScreenNavigator = TabNavigator(
  {
    ExploreChat: { screen: ExploreChat },
    SearchChat: { screen: SearchChat },
    ProfileChat: { screen: ProfileChat }
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
              onPress={() => props.navigation.navigate("ExploreChat")}>
              <Icon name="ios-compass" size={30} />

            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("SearchChat")}>
              <Icon name="ios-camera" size={35} />

            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("ProfileChat")}>
              <Icon name="md-contact" size={30} />

            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
));
