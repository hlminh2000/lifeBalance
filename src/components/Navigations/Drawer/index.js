import React from "react";
import { Dimensions, StatusBar } from "react-native";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import { DrawerNavigator } from "react-navigation";
import { Text } from "native-base";
import ActivitiesScreen from "../../ActivitiesScreen/index.js";
import CalendarScreen from "../../CalendarScreen/index.js";
import LinearGradient from "react-native-linear-gradient";
import STYLE from "../../../styleVariable";

const { height, width } = Dimensions.get("window");

const NavigationItem = ({ title, navigationTarget, icon, navigation }) => (
  <View>
    <TouchableHighlight>
      <Text onPress={() => navigation.navigate(navigationTarget)}>{title}</Text>
    </TouchableHighlight>
  </View>
);

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
    contentComponent: ({ navigation }) => (
      <View>
        <StatusBar
          backgroundColor={STYLE.COLOR_PRIMARY_DARK}
          barStyle="light-content"
        />
        <LinearGradient
          colors={[STYLE.COLOR_PRIMARY, STYLE.COLOR_SECONDARY]}
          style={{ height: 200 }}
        />
        {[
          {
            title: "My Calendar",
            navigationTarget: "CalendarScreen",
            icon: ""
          },
          {
            title: "My Activities",
            navigationTarget: "ActivitiesScreen",
            icon: ""
          }
        ].map((menuItem, i) => (
          <NavigationItem key={i} {...menuItem} navigation={navigation} />
        ))}
      </View>
    )
  }
);

export default RootDrawer;
