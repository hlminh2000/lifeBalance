import React, { Component } from "react";
import { View } from "react-native";

export default ({ successRender = props => <View {...props} /> }) => (
  <React.Fragment>{successRender()}</React.Fragment>
);
