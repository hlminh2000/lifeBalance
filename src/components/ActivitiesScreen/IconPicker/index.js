import React, { Component } from "react";
import { Text, View, TouchableHighlight, ListView } from "react-native";
import icons from "../../icons";
import { chunk } from "lodash";

const AVAILABLE_ICONS = [
  "book",
  "heart",
  "poop",
  "weight_lifter",
  "heavy_dollar_sign",
  "fr"
];

const IconPicker = ({ selectedIcon, onSelect }) => (
  <View style={{ display: "flex", width: "100%", justifyContent: "center" }}>
    {chunk(AVAILABLE_ICONS, 5).map((row, i) => (
      <View
        key={i}
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          padding: 10
        }}
      >
        {row.map((iconName, i) => (
          <TouchableHighlight key={i} onPress={() => onSelect(iconName)}>
            {icons[iconName]({
              key: iconName,
              style: {
                fontSize: 20
              }
            })}
          </TouchableHighlight>
        ))}
      </View>
    ))}
  </View>
);
export default IconPicker;
