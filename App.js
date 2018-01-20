/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import ActivitiesScreen from './src/components/ActivitiesScreen/index.js'
import CalendarScreen from './src/components/CalendarScreen/index.js'
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import reducers from './src/reducers.js';
import { Provider } from 'react-redux'
import { createStore } from 'redux'


const store = createStore(reducers)

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
      <Provider store={store}>
        <StyleProvider style={getTheme(platform)}>
          <RootDrawer/>
        </StyleProvider>
      </Provider>
    );
  }
}
