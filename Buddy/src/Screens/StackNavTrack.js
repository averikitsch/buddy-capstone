import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Found from './Found.js';
import Track from './Track.js';
import Search from './SearchScreen';


export default (TrackNav = StackNavigator({
  Search: { screen: Search },
  Found: { screen: Found },
  Track: { screen: Track },
}));
