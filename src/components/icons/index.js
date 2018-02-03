import React from "react";
import { Text } from "react-native";
import nodeEmoji from "node-emoji";
const emoji = nodeEmoji.get("coffee");

export default {
  DEFAULT: props => null,
  book: props => <Text {...props}>{nodeEmoji.get("book")}</Text>,
  heart: props => <Text {...props}>{nodeEmoji.get("heart")}</Text>,
  poop: props => <Text {...props}>{nodeEmoji.get("poop")}</Text>,
  fr: props => <Text {...props}>{nodeEmoji.get("flag-fr")}</Text>,
  cn: props => <Text {...props}>{nodeEmoji.get("cn")}</Text>,
  dancer: props => <Text {...props}>{nodeEmoji.get("dancer")}</Text>,
  violin: props => <Text {...props}>{nodeEmoji.get("violin")}</Text>,
  nerd_face: props => <Text {...props}>{nodeEmoji.get("nerd_face")}</Text>,
  mortar_board: props => (
    <Text {...props}>{nodeEmoji.get("mortar_board")}</Text>
  ),
  heavy_dollar_sign: props => (
    <Text {...props}>{nodeEmoji.get("heavy_dollar_sign")}</Text>
  ),
  studio_microphone: props => (
    <Text {...props}>{nodeEmoji.get("studio_microphone")}</Text>
  ),
  lower_left_paintbrush: props => (
    <Text {...props}>{nodeEmoji.get("lower_left_paintbrush")}</Text>
  ),
  weight_lifter: props => (
    <Text {...props}>{nodeEmoji.get("weight_lifter")}</Text>
  )
};
