import React from "react";
import Canvas from "react-native-canvas";
import { WebView } from "react-native";

class CustomCanvas extends Canvas {
  constructor(props) {
    super(props);
  }
}

export default class CircularSlider extends React.Component {
  handleCanvas = canvas => {
    console.log(canvas);
  };

  render() {
    return (
      <CustomCanvas
        style={{
          width: 200,
          height: 200,
          borderColor: "#000000",
          borderWidth: 0.5
        }}
        ref={this.handleCanvas}
      />
    );
  }
}
