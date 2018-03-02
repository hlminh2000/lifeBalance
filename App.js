import React, { Component } from "react";
import { StatusBar } from "react-native";
import { StyleProvider } from "native-base";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import storage from "redux-persist/lib/storage";

import getTheme from "./native-base-theme/components";
import platform from "./native-base-theme/variables/platform";
import reducers from "./src/reducers.js";
import RootDrawer from "./src/components/Navigations/Drawer/index.js";
import STYLE from "./src/styleVariable";
import AuthScreen from "./src/components/AuthScreen";
import CircularSlider from "./src/components/CalendarScreen/CircularSlider/index.js";
import CircularTimeRangeSelector from "./src/components/CalendarScreen/CircularTimeRangeSelector/index.js";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["activitiesScreen", "calendarScreen"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  composeWithDevTools()
  // applyMiddleware(...middleware),
  // other store enhancers if any
);

const persistor = persistStore(store);

export default class App extends Component<{}> {
  componentDidMount() {}
  render() {
    // persistor.purge();
<<<<<<< HEAD
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StyleProvider style={getTheme(platform)}>
            <React.Fragment>
              <StatusBar
                backgroundColor={STYLE.COLOR_PRIMARY_DARK}
                barStyle="light-content"
              />
              <AuthScreen
                successRender={({ ...props }) => <RootDrawer {...props} />}
              />
            </React.Fragment>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
=======
    return <CircularTimeRangeSelector />;
>>>>>>> fixes bug
  }
}
