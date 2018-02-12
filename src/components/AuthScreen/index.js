import React, { Component } from "react";
import { View } from "react-native";
import { Text, Button } from "native-base";
import { connect } from "react-redux";
import Input from "../reusables/Input";
import auth from "../../utils/auth";

const facebookLogin = async () => {
  const user = await auth.facebookLogin();
  return Promise.resolve(user);
};

const googleLogin = async () => {
  const user = await auth.googleLogin();
  return Promise.resolve(user);
};

export default connect(
  state => ({
    currentUser: state.auth.currentUser
  }),
  dispatch => ({
    onLoginComplete: user => console.log(user)
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
          <Button
            onPress={async () => {
              const user = await facebookLogin();
              if (user != "CANCELLED") {
                onLoginComplete(user);
              }
            }}
          >
            <Text>Facebook</Text>
          </Button>
          <Button
            onPress={async () => {
              const user = await googleLogin();
              if (user != "CANCELLED") {
                onLoginComplete(user);
              }
            }}
          >
            <Text>Google</Text>
          </Button>
        </View>
      )}
    </React.Fragment>
  )
);
