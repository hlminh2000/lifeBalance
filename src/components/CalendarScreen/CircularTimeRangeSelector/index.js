import React, { Component } from "react";
import { WebView, View, Text } from "react-native";
import CircularSlider from "../CircularSlider";

export default class CircularTimeRangeSlider extends Component {
  state = {
    minValue: 0,
    maxValue: 15
  };
  getDeltaTime = () => {
    const { maxValue, minValue } = this.state;
    const diff = maxValue - minValue;
    const hours = Math.floor(diff / 60);
    return {
      hours,
      minutes: diff - hours * 60
    };
  };
  render() {
    const radius = 250;
    const arcThickness = 70;
    const dimention = radius + arcThickness / 2;
    const deltaTime = this.getDeltaTime();
    return (
      <View
        style={{
          width: dimention,
          height: dimention,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: dimention,
            height: dimention,
            position: "absolute",
            top: 0,
            left: 0
          }}
        >
          <CircularSlider
            {...{
              minValue: 0,
              maxValue: 1440,
              interval: 15,
              radius,
              arcThickness,
              minValueInitial: this.state.minValue,
              maxValueInitial: this.state.maxValue,
              onValueChange: ({ min, max }) => {
                this.setState({
                  minValue: min,
                  maxValue: max
                });
              }
            }}
          />
        </View>
        <View>
          <Text>{`${deltaTime.hours}h ${deltaTime.minutes}m`}</Text>
        </View>
      </View>
    );
  }
}
