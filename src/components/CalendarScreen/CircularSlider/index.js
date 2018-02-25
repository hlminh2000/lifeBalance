import React from "react";
import { WebView } from "react-native";

export default class CircularSlider extends React.Component {
  render() {
    return (
      <WebView
        source={require("./webComponent/index.html")}
        style={{
          width: 200,
          height: 200,
          borderColor: "#000000",
          borderWidth: 0.5
        }}
      />
    );
  }
}
