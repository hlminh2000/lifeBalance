import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet, View } from "react-native";
import { DrawerNavigator } from "react-navigation";
import { connect } from "react-redux";
import { Text, List, ListItem } from "native-base";
import { Bubbles, DoubleBounce, Bars, Pulse } from "react-native-loader";
import { compose } from "recompose";

import ActivitiesScreen from "../../ActivitiesScreen/index.js";
import CalendarScreen from "../../CalendarScreen/index.js";
import LinearGradient from "react-native-linear-gradient";
import STYLE from "../../../styleVariable";
import auth from "../../../utils/auth";
import DrawerComponent from "./DrawerComponent";
import { withQuery } from "../../../utils/api";
import { getUserToken } from "../../../utils/auth";
import { allUserDataQuery } from "../../../utils/api/queries";
import { COLOR_PRIMARY } from "../../../styleVariable";

const { height, width } = Dimensions.get("window");

const RootDrawer = DrawerNavigator(
  {
    CalendarScreen: {
      drawerLabel: "My Calendar",
      screen: CalendarScreen
    },
    ActivitiesScreen: {
      drawerLabel: "My Activities",
      screen: ActivitiesScreen
    }
  },
  {
    drawerWidth: width * 0.85,
    contentComponent: DrawerComponent
  }
);

export const withQueryFactory = ({ user }) =>
  withQuery({
    query: user
      .getIdToken()
      .then(idToken => allUserDataQuery({ idToken: `${idToken}` }))
  });

export const MainNavigation = compose(
  connect(
    state => ({}),
    dispatch => ({
      restoreUserData: ({ user } = {}) =>
        dispatch({
          type: "ONLINE_USER_RESTORE",
          payload: {
            user
          }
        })
    })
  )
)(
  ({
    data: { user },
    error,
    httpError,
    loading,
    restoreUserData,
    ...props
  }) => {
    console.log("user: ", user);
    console.log("error: ", error);
    console.log("httpError: ", httpError);
    if (!loading && user) {
      restoreUserData({ user });
    }
    return loading ? (
      <View
        style={{
          backgroundColor: "#ffffff",
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <DoubleBounce size={30} color={COLOR_PRIMARY} />
      </View>
    ) : (
      <RootDrawer {...{ ...props, user, loading }} />
    );
  }
);

export default RootDrawer;
