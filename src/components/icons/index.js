import React from "react";
import { Text } from "react-native";
import nodeEmoji from "node-emoji";
const emoji = nodeEmoji.get("coffee");

export default {
  book: props => <Text {...props}>{nodeEmoji.get("book")}</Text>,
  heart: props => <Text {...props}>{nodeEmoji.get("heart")}</Text>,
  poop: props => <Text {...props}>{nodeEmoji.get("poop")}</Text>,
  fr: props => <Text {...props}>{nodeEmoji.get("flag-fr")}</Text>,
  heavy_dollar_sign: props => (
    <Text {...props}>{nodeEmoji.get("heavy_dollar_sign")}</Text>
  ),
  weight_lifter: props => (
    <Text {...props}>{nodeEmoji.get("weight_lifter")}</Text>
  )
};
