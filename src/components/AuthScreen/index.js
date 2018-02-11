import React, { Component } from "react";
import { View } from "react-native";
import { Text, Button } from "native-base";
import Input from "../reusables/Input";
import { facebookLogin, googleLogin } from "../../utils/auth";

export default ({
  successRender = props => <View {...props} />,
  currentUser = null
}) => (
  <React.Fragment>
    {currentUser ? (
      successRender()
    ) : (
      <View>
        <Text>log in!!!</Text>
        <Button onPress={() => facebookLogin()}>
          <Text>Facebook</Text>
        </Button>
        <Button>
          <Text>Google</Text>
        </Button>
      </View>
    )}
  </React.Fragment>
);
