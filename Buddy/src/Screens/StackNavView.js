import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import ViewInfo from './ViewInfo';
import Track from './Track';
import LogList from './LogList';


export default (ViewNav = StackNavigator({
  Logs: {screen: LogList },
  View: { screen: ViewInfo },
  Edit: { screen: Track },
}));
