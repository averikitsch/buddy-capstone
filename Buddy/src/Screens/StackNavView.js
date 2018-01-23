import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import ViewInfo from './ViewInfo';
import Edit from './Edit';
import LogScreen from './LogScreen';
import EditWish from './EditWish'

export default ViewNav = StackNavigator({
  Logs: { screen: LogScreen },
  View: { screen: ViewInfo },
  Edit: { screen: Edit },
  EditWish: { screen: EditWish },
});
