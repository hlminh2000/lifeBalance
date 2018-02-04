import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import { DrawerNavigator } from "react-navigation";
import { Text, List, ListItem } from "native-base";
import ActivitiesScreen from "../../ActivitiesScreen/index.js";
import CalendarScreen from "../../CalendarScreen/index.js";
import LinearGradient from "react-native-linear-gradient";
import STYLE from "../../../styleVariable";

const { height, width } = Dimensions.get("window");

const NavigationItem = ({ title, navigationTarget, icon, navigation }) => (
  <View>
    <TouchableHighlight onPress={() => navigation.navigate(navigationTarget)}>
      <Text>{title}</Text>
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
        <LinearGradient
          colors={[STYLE.COLOR_PRIMARY, STYLE.COLOR_SECONDARY]}
          style={{ height: 200 }}
        />
        <List>
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
            <ListItem style={{ borderBottomWidth: 0 }} key={i}>
              <NavigationItem key={i} {...menuItem} navigation={navigation} />
            </ListItem>
          ))}
        </List>
      </View>
    )
  }
);

export default RootDrawer;
