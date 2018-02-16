import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet, View } from "react-native";
import { DrawerNavigator } from "react-navigation";
import { connect } from "react-redux";
import { Text, List, ListItem } from "native-base";
import ActivitiesScreen from "../../ActivitiesScreen/index.js";
import CalendarScreen from "../../CalendarScreen/index.js";
import LinearGradient from "react-native-linear-gradient";
import STYLE from "../../../styleVariable";
import auth from "../../../utils/auth";
import DrawerComponent from "./DrawerComponent";

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

export default RootDrawer;
