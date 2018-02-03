import React, { Component } from "react";
import { Text, View, TouchableHighlight, ListView } from "react-native";
import icons from "../../icons";
import { chunk } from "lodash";
import STYLE from "../../../styleVariable";

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
          <View key={i}>
            <TouchableHighlight onPress={() => onSelect(iconName)}>
              {icons[iconName]({
                key: iconName,
                style: {
                  fontSize: 20
                }
              })}
            </TouchableHighlight>
            <View
              style={{
                position: "absolute",
                width: 7,
                height: 7,
                top: 30,
                left: 10,
                backgroundColor:
                  selectedIcon === iconName ? STYLE.COLOR_PRIMARY : null,
                borderRadius: 100
              }}
            />
          </View>
        ))}
      </View>
    ))}
  </View>
);

export default IconPicker;
