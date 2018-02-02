import React from "react";
// import book from "./book.js";
// import heart from "./heart.js";
// import dumbel from "./dumbel.js";
// import people from "./people.js";
import { Text } from "react-native";
import nodeEmoji from "node-emoji";
const emoji = nodeEmoji.get("coffee");

export default {
  book: props => <Text {...props}>{nodeEmoji.get("book")}</Text>,
  heart: props => <Text {...props}>{nodeEmoji.get("heart")}</Text>,
  dumbel: props => <Text {...props}>{nodeEmoji.get("dumbel")}</Text>,
  people: props => <Text {...props}>{nodeEmoji.get("people")}</Text>,
  poop: props => <Text {...props}>{nodeEmoji.get("poop")}</Text>
};
