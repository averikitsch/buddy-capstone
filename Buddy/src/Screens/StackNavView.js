import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import ViewInfo from './ViewInfo';
import Edit from './Edit';
import LogList from './LogList';


export default (ViewNav = StackNavigator({
  Logs: {screen: LogList },
  View: { screen: ViewInfo },
  Edit: { screen: Edit },
}));
