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

const { height, width } = Dimensions.get("window");

const NavigationItem = ({ title, navigationTarget, icon, navigation }) => (
  <View>
    <Text onPress={() => navigation.navigate(navigationTarget)}>{title}</Text>
  </View>
);

const UserSection = ({ user }) => (
  <LinearGradient
    colors={[STYLE.COLOR_PRIMARY, STYLE.COLOR_SECONDARY]}
    style={{ height: 200 }}
  >
    {user.displayName}
  </LinearGradient>
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
        <UserSection user={{}} />
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
    // connect(
    //   state => ({
    //     user: state.currentUser
    //   }),
    //   dispatch => ({})
    // )(({ user }) => (
    //   <View>
    //     <UserSection user={user} />
    //     <List>
    //       {[
    //         {
    //           title: "My Calendar",
    //           navigationTarget: "CalendarScreen",
    //           icon: ""
    //         },
    //         {
    //           title: "My Activities",
    //           navigationTarget: "ActivitiesScreen",
    //           icon: ""
    //         }
    //       ].map((menuItem, i) => (
    //         <ListItem style={{ borderBottomWidth: 0 }} key={i}>
    //           <NavigationItem key={i} {...menuItem} navigation={navigation} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </View>
    // ))
  }
);

export default RootDrawer;
