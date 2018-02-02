import React, { Component } from "react";
import { Text, View, TouchableHighlight, ListView } from "react-native";
import icons from "../../icons";

const AVAILABLE_ICONS = [
  "book",
  "heart",
  "poop",
  "weight_lifter",
  "heavy_dollar_sign"
];

export default ({ iconName }) => (
  <View>
    {AVAILABLE_ICONS.map(iconName =>
      icons[iconName]({
        key: iconName,
        style: {
          fontSize: 20
        }
      })
    )}
  </View>
);
