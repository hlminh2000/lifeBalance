import React from "react";
import { WebView } from "react-native";

export default class CircularSlider extends React.Component {
  render() {
    return (
      <WebView
        source={require("./webComponent/index.html")}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          borderColor: "#000000",
          borderWidth: 0.5
        }}
      />
    );
  }
}
