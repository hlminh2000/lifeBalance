import React, { Component } from "react";
import { WebView, View, Text } from "react-native";
import CircularSlider from "../CircularSlider";
import style from "../../../styleVariable";

export default class CircularTimeRangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minValue: props.minValueInitial || 540,
      maxValue: props.maxValueInitial || 1020
    };
  }
  getDeltaTime = () => {
    const { maxValue, minValue } = this.state;
    const minutesPerDay = 24 * 60;
    const diff =
      maxValue - minValue >= 0
        ? maxValue - minValue
        : minutesPerDay + (maxValue - minValue);
    const hours = Math.floor(diff / 60);
    return {
      hours,
      minutes: diff - hours * 60
    };
  };
  getTimeFromMinute = minutes => {
    const hours = Math.floor(minutes / 60);
    return {
      hours,
      minutes: minutes - hours * 60
    };
  };
  render() {
    const { minValue: from, maxValue: to } = this.state;
    const { onValueChange } = this.props;
    const radius = 250;
    const arcThickness = 70;
    const dimention = radius + arcThickness / 2;
    const deltaTime = this.getDeltaTime();
    const timeFrom = this.getTimeFromMinute(from);
    const timeTo = this.getTimeFromMinute(to);
    const leftPad = num => (num > 9 ? num : `0${num}`);
    return (
      <View style={{ alignItems: "center", backgroundColor: "#ffffff" }}>
        <View
          style={{
            marginBottom: 10,
            width: "100%",
            justifyContent: "space-around",
            flexDirection: "row"
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text>from</Text>
            <Text
              style={{ color: style.COLOR_PRIMARY, fontSize: 25 }}
            >{`${leftPad(timeFrom.hours)}:${leftPad(timeFrom.minutes)}`}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text>to</Text>
            <Text
              style={{ color: style.COLOR_PRIMARY, fontSize: 25 }}
            >{`${leftPad(timeTo.hours)}:${leftPad(timeTo.minutes)}`}</Text>
          </View>
        </View>
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
                arcColor: eval(style.COLOR_PRIMARY.split("#").join("0x")),
                minValueInitial: this.state.minValue,
                maxValueInitial: this.state.maxValue,
                onValueChange: ({ min, max }) => {
                  this.setState(
                    {
                      minValue: min,
                      maxValue: max
                    },
                    () => onValueChange({ min, max })
                  );
                }
              }}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: style.COLOR_PRIMARY, fontSize: 30 }}>
              {`${leftPad(deltaTime.hours)}`}
            </Text>
            <Text>h</Text>
            <Text
              style={{ color: style.COLOR_PRIMARY, fontSize: 30 }}
            >{` ${leftPad(deltaTime.minutes)}`}</Text>
            <Text>m</Text>
          </View>
        </View>
      </View>
    );
  }
}
