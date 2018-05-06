import React, { Component } from "react";
import { Platform, StatusBar } from "react-native";
import { StyleProvider } from "native-base";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import { setCustomSourceTransformer } from "react-native/Libraries/Image/resolveAssetSource";
import { compose } from "recompose";
import storage from "redux-persist/lib/storage";

import getTheme from "./native-base-theme/components";
import platform from "./native-base-theme/variables/platform";
import reducers from "./src/reducers.js";
import {
  withAllUserDataQuery,
  MainNavigation
} from "./src/components/Navigations/Drawer/index.js";
import STYLE from "./src/styleVariable";
import AuthScreen from "./src/components/AuthScreen";
import CircularSlider from "./src/components/CalendarScreen/CircularSlider/index.js";
import CircularTimeRangeSelector from "./src/components/CalendarScreen/CircularTimeRangeSelector/index.js";
import TimeSetterModal from "./src/components/CalendarScreen/TimeSetterModal";
import { UserProvider } from "./src/utils/auth";

setCustomSourceTransformer(function(resolver) {
  if (
    Platform.OS === "android" &&
    !resolver.serverUrl &&
    !resolver.bundlePath &&
    resolver.asset.type === "html"
  ) {
    resolver.bundlePath = "/android_asset/";
  }

  return resolver.defaultAsset();
});

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
    // return <TimeSetterModal isVisible={true} />;
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
                successRender={({ user, ...props }) => {
                  const LinkedNavigation = withAllUserDataQuery({ user })(
                    ({ data, error, loading }) => (
                      <UserProvider user={user}>
                        <MainNavigation
                          {...{ ...props, data, error, loading }}
                        />
                      </UserProvider>
                    )
                  );
                  return <LinkedNavigation />;
                }}
              />
            </React.Fragment>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}
