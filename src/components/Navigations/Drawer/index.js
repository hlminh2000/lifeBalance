import React from "react";
import { Dimensions } from "react-native";
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

class SideDrawer extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View>
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
    );
  }
}

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
    contentComponent: props => <SideDrawer navigation={props.navigation} />
  }
);

export default RootDrawer;
