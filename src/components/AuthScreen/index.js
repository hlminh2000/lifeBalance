import React, { Component } from "react";
import { View } from "react-native";
import { Text, Button, Icon } from "native-base";
import { connect } from "react-redux";
import Input from "../reusables/Input";
import auth from "../../utils/auth";
import actions from "./actions";

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
      dispatch(actions["AUTH/LOGIN_COMPLETE"].create(user))
  })
)(
  ({
    successRender = props => <View {...props} />,
    currentUser = null,
    onLoginComplete
  }) => (
    <React.Fragment>
      {currentUser ? (
        successRender()
      ) : (
        <View>
          <Text>log in!!!</Text>
          <SocialButton
            style={{ backgroundColor: "#0079FF" }}
            onPress={async () => {
              const user = await facebookLogin();
              if (user != "CANCELLED") {
                onLoginComplete(user);
              }
            }}
            title="Facebook"
            iconName="logo-facebook"
          />
          <SocialButton
            style={{ backgroundColor: "#D84132" }}
            onPress={async () => {
              const user = await googleLogin();
              if (user != "CANCELLED") {
                onLoginComplete(user);
              }
            }}
            title="Google"
            iconName="logo-google"
          />
        </View>
      )}
    </React.Fragment>
  )
);
