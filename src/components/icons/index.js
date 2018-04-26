import React from "react";
import { Text } from "react-native";
import nodeEmoji from "node-emoji";
const emoji = nodeEmoji.get("coffee");

const defaultStyle = {
  color: "#rgba(0,0,0,1)"
};

export default {
  DEFAULT: props => null,
  book: props => (
    <Text {...{ ...props, style: { ...defaultStyle, ...props.style } }}>
      {nodeEmoji.get("book")}
    </Text>
  ),
  heart: props => (
    <Text {...{ ...props, style: { ...defaultStyle, ...props.style } }}>
      {nodeEmoji.get("heart")}
    </Text>
  ),
  poop: props => (
    <Text {...{ ...props, style: { ...defaultStyle, ...props.style } }}>
      {nodeEmoji.get("poop")}
    </Text>
  ),
  fr: props => (
    <Text {...{ ...props, style: { ...defaultStyle, ...props.style } }}>
      {nodeEmoji.get("flag-fr")}
    </Text>
  ),
  cn: props => (
    <Text {...{ ...props, style: { ...defaultStyle, ...props.style } }}>
      {nodeEmoji.get("cn")}
    </Text>
  ),
  dancer: props => (
    <Text {...{ ...props, style: { ...defaultStyle, ...props.style } }}>
      {nodeEmoji.get("dancer")}
    </Text>
  ),
  violin: props => (
    <Text {...{ ...props, style: { ...defaultStyle, ...props.style } }}>
      {nodeEmoji.get("violin")}
    </Text>
  ),
  nerd_face: props => (
    <Text {...{ ...props, style: { ...defaultStyle, ...props.style } }}>
      {nodeEmoji.get("nerd_face")}
    </Text>
  ),
  mortar_board: props => (
    <Text {...{ ...props, style: { ...defaultStyle, ...props.style } }}>
      {nodeEmoji.get("mortar_board")}
    </Text>
  ),
  heavy_dollar_sign: props => (
    <Text {...{ ...props, style: { ...defaultStyle, ...props.style } }}>
      {nodeEmoji.get("heavy_dollar_sign")}
    </Text>
  ),
  studio_microphone: props => (
    <Text {...{ ...props, style: { ...defaultStyle, ...props.style } }}>
      {nodeEmoji.get("studio_microphone")}
    </Text>
  ),
  lower_left_paintbrush: props => (
    <Text {...{ ...props, style: { ...defaultStyle, ...props.style } }}>
      {nodeEmoji.get("lower_left_paintbrush")}
    </Text>
  ),
  weight_lifter: props => (
    <Text {...{ ...props, style: { ...defaultStyle, ...props.style } }}>
      {nodeEmoji.get("weight_lifter")}
    </Text>
  )
};
