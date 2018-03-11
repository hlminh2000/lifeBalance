import React from "react";
import { Dimensions } from "react-native";
import { StyleSheet, View, Image } from "react-native";
import { DrawerNavigator } from "react-navigation";
import { connect } from "react-redux";
import { Text, List, ListItem } from "native-base";
import ActivitiesScreen from "../../ActivitiesScreen/index.js";
import CalendarScreen from "../../CalendarScreen/index.js";
import LinearGradient from "react-native-linear-gradient";
import STYLE from "../../../styleVariable";
import auth from "../../../utils/auth";

const NavigationItem = ({ title, navigationTarget, icon, navigation }) => (
  <View>
    <Text onPress={() => navigation.navigate(navigationTarget)}>{title}</Text>
  </View>
);

const DrawerView = ({ navigation, currentUser }) => (
  <View>
    <LinearGradient
      colors={[STYLE.COLOR_PRIMARY, STYLE.COLOR_SECONDARY]}
      style={{
        height: 200,
        justifyContent: "space-between",
        paddingTop: 30,
        paddingLeft: 25,
        paddingBottom: 25
      }}
    >
      <Image
        elevation={2}
        style={{ width: 80, height: 80, borderRadius: 50 }}
        source={{ uri: currentUser.photoURL }}
      />
      <Text style={{ color: "white", fontSize: 23 }}>
        {currentUser.displayName}
      </Text>
    </LinearGradient>
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
);

export default connect(
  state => ({
    currentUser: state.auth.currentUser
  }),
  dispatch => ({})
)(DrawerView);
