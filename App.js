

import React, { Component } from 'react';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';
import reducers from './src/reducers.js';
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import RootDrawer from './src/components/Navigations/Drawer/index.js'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducers, composeWithDevTools(
  // applyMiddleware(...middleware),
  // other store enhancers if any
))


export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(platform)}>
            <RootDrawer />
        </StyleProvider>
      </Provider>
    );
  }
}
