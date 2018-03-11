import React from "react";
import { WebView, View } from "react-native";

export default class CircularSlider extends React.Component {
  render() {
    const {
      radius = 250,
      maxValue = 720,
      minValue = 0,
      arcThickness = 70,
      arcColor = null,
      minValueInitial = 10,
      maxValueInitial = 15,
      interval = 2,
      onValueChange = minMax => {}
    } = this.props;
    return (
      <WebView
        source={{ uri: "file:///android_asset/webComponent/index.html" }}
        onMessage={e => {
          const { payload: { state: { minValue, maxValue } } } = JSON.parse(
            e.nativeEvent.data
          );
          onValueChange({
            min: minValue,
            max: maxValue
          });
        }}
        onShouldStartLoadWithRequest={() => true}
        injectedJavaScript={`
            window.radius = ${radius};
            window.maxValue = ${maxValue};
            window.minValue = ${minValue};
            window.arcThickness = ${arcThickness};
            window.arcColor = ${arcColor};
            window.minValueInitial = ${minValueInitial};
            window.maxValueInitial = ${maxValueInitial};
            window.interval = ${interval};
            init();
        `}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: radius + arcThickness / 2,
          height: radius + arcThickness / 2,
          borderColor: "#000000",
          borderWidth: 0.5
        }}
      />
    );
  }
}
