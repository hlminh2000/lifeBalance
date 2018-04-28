import React, { Component } from "react";
import { View } from "react-native";
import { Text, Button, Icon, Card, CardItem } from "native-base";
import { connect } from "react-redux";
import Input from "../reusables/Input";
import auth from "../../utils/auth";
import actions from "./actions";
import LinearGradient from "react-native-linear-gradient";
import STYLE from "../../styleVariable";
import { fetchAllUserData } from "../../utils/api";

const facebookLogin = async () => {
  const user = await auth.facebookLogin();
  return Promise.resolve(user);
};

const googleLogin = async () => {
  const user = await auth.googleLogin();
  return Promise.resolve(user);
};

const SocialButton = ({ iconName, title, ...rest }) => (
  <Button {...rest} iconLeft>
    <Icon name={iconName} />
    <Text>{title}</Text>
  </Button>
);

export default connect(
  state => ({
    currentUser: state.auth.currentUser
  }),
  dispatch => ({
    onLoginComplete: user =>
      auth
        .getCurrentUser()
        .getIdToken()
        .then(idToken => fetchAllUserData({ idToken }))
        .then(userData => {
          dispatch(actions["AUTH/LOGIN_COMPLETE"].create({ user, userData }));
        })
  })
)(
  ({
    successRender = props => <View {...props} />,
    currentUser = null,
    onLoginComplete
  }) => (
    <React.Fragment>
      {auth.getCurrentUser() ? (
        successRender({ user: auth.getCurrentUser() })
      ) : (
        <LinearGradient
          colors={[STYLE.COLOR_PRIMARY, STYLE.COLOR_SECONDARY]}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Card style={{ maxWidth: 300, maxHeight: 200 }}>
            <CardItem
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Text>Log in with</Text>
              <SocialButton
                style={{ backgroundColor: "#0079FF" }}
                onPress={async () => {
                  const authResult = await facebookLogin();
                  if (authResult != "CANCELLED") {
                    onLoginComplete(authResult.user);
                  }
                }}
                title="Facebook"
                iconName="logo-facebook"
              />
              {
                // <SocialButton
                //   style={{ backgroundColor: "#D84132" }}
                //   onPress={async () => {
                //     const user = await googleLogin();
                //     if (user != "CANCELLED") {
                //       onLoginComplete(user);
                //     }
                //   }}
                //   title="Google"
                //   iconName="logo-google"
                // />
              }
            </CardItem>
          </Card>
        </LinearGradient>
      )}
    </React.Fragment>
  )
);
