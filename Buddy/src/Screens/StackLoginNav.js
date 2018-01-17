import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import TabNavigator from './TabNavigator';


export default StackTabNav = StackNavigator({
  Login: {screen: LoginScreen },
  Tabs: { screen: TabNavigator },
},{
  initialRouteName: 'Login',
  navigationOptions: {
    header: null,
  }
});
