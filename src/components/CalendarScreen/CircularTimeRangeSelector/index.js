import React, { Component } from "react";
import { WebView, View, Text } from "react-native";
import CircularSlider from "../CircularSlider";

export default class CircularTimeRangeSlider extends Component {
  state = {
    maxValue = 10,
    minValue = 15,
  }
  render() {
    return (
      <View>
        <CircularSlider {...{
          minValueInitial: this.state.minValue,
          maxValueInitial: this.state.maxValue,
          onValueChange => ({min, max}) => {
            this.setState({
              minValue: min,
              maxValue: max,
            })
          }
        }}/>
        <View>
          <Text>min: {this.state.minValue}</Text>
          <Text>max: {this.state.maxValue}</Text>
        </View>
      </View>
    );
  }
}
