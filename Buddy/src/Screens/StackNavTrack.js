import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Found from './Found.js';
import Track from './Track.js';

export default (TrackNav = StackNavigator({
  Found: { screen: Found },
  Track: { screen: Track },
}));
