import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet, View } from "react-native";
import { DrawerNavigator } from "react-navigation";
import { Text } from "native-base";
import ActivitiesScreen from "../../ActivitiesScreen/index.js";
import CalendarScreen from "../../CalendarScreen/index.js";

const { height, width } = Dimensions.get("window");

const Header = ({}) => (
  <View
    style={{
      height: 200,
      backgroundColor: "green"
    }}
  />
);

const RootDrawer = DrawerNavigator(
  {
    Calendar: {
      drawerLabel: "My Calendar",
      screen: CalendarScreen
    },
    ActivitiesScreen: {
      drawerLabel: "My Activities",
      screen: ActivitiesScreen
    }
  },
  {
    drawerWidth: width * 0.85
    // contentComponent: props => <Header />
  }
);

export default RootDrawer;
