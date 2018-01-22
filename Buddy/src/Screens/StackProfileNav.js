import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
// import LoginScreen from './LoginScreen';
import StackLoginNav from './StackLoginNav';
import ProfileScreen from './ProfileScreen';

export default StackTabNav = StackNavigator({
  Profile: { screen: ProfileScreen },
  // Login: {screen: StackLoginNav },
}
,{
  initialRouteName: 'Profile',
  // navigationOptions: {
  //   header: null,
  // }
}
);
