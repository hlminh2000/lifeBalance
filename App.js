/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import ActivitiesScreen from './src/components/ActivitiesScreen/index.js'
import CalendarScreen from './src/components/CalendarScreen/index.js'

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const RootDrawer = DrawerNavigator({
  Calendar: {
    drawerLabel: "My Calendar",
    screen: CalendarScreen
  },
  ActivitiesScreen: {
    drawerLabel: "My Activities",
    screen: ActivitiesScreen
  },
});

export default class App extends Component<{}> {
  render() {
    return (
      <RootDrawer/>
    );
  }
}
