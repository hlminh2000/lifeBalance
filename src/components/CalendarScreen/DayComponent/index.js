import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";

const STYLESHEET_ID = "stylesheet.day.single";

const foregroundColor = "#ffffff";
const textLinkColor = "#00adf5";
const textDefaultColor = "#2d4150";

const defaultStyle = {
  foregroundColor,
  backgroundColor: "#f4f4f4",
  separatorColor: "#e8e9ec",

  processedColor: "#a7e0a3",
  processingColor: "#ffce5c",
  failedColor: "rgba(246, 126, 126,1)",

  textDefaultColor,
  textColor: "#43515c",
  textLinkColor,
  textSecondaryColor: "#7a92a5",

  textDayFontFamily: "System",
  textMonthFontFamily: "System",
  textDayHeaderFontFamily: "System",

  textMonthFontWeight: "300",

  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 13,

  calendarBackground: foregroundColor,
  textSectionTitleColor: "#b6c1cd",
  selectedDayBackgroundColor: textLinkColor,
  selectedDayTextColor: foregroundColor,
  todayTextColor: textLinkColor,
  dayTextColor: textDefaultColor,
  textDisabledColor: "#d9e1e8",
  dotColor: textLinkColor,
  selectedDotColor: foregroundColor,
  arrowColor: textLinkColor,
  monthTextColor: textDefaultColor,
  agendaDayTextColor: "#7a92a5",
  agendaDayNumColor: "#7a92a5",
  agendaTodayColor: textLinkColor,
  agendaKnobColor: Platform.OS === "ios" ? "#f2F4f5" : "#4ac4f7"
};

const styleConstructor = (theme = {}) => {
  const appStyle = { ...defaultStyle, ...theme };
  return StyleSheet.create({
    base: {
      width: 32,
      height: 32,
      alignItems: "center"
    },
    text: {
      marginTop: Platform.OS === "android" ? 4 : 6,
      fontSize: appStyle.textDayFontSize,
      fontFamily: appStyle.textDayFontFamily,
      fontWeight: "300",
      color: appStyle.dayTextColor,
      backgroundColor: "rgba(255, 255, 255, 0)"
    },
    alignedText: {
      marginTop: Platform.OS === "android" ? 4 : 6
    },
    selected: {
      backgroundColor: appStyle.selectedDayBackgroundColor,
      borderRadius: 16
    },
    todayText: {
      color: appStyle.todayTextColor
    },
    selectedText: {
      color: appStyle.selectedDayTextColor
    },
    disabledText: {
      color: appStyle.textDisabledColor
    },
    ...(theme[STYLESHEET_ID] || {})
  });
};

class Day extends Component {
  static propTypes = {
    // TODO: disabled props should be removed
    state: PropTypes.oneOf(["selected", "disabled", "today", ""]),

    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marking: PropTypes.any,
    onPress: PropTypes.func,
    date: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.style = styleConstructor(props.theme);
    this.onDayPress = this.onDayPress.bind(this);
    this.onDayLongPress = this.onDayLongPress.bind(this);
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }
  onDayLongPress() {
    this.props.onLongPress(this.props.date);
  }

  shouldComponentUpdate(nextProps) {
    const changed = [
      "state",
      "children",
      "marking",
      "onPress",
      "activitiesLog"
    ].reduce((prev, next) => {
      if (prev) {
        return prev;
      } else if (nextProps[next] !== this.props[next]) {
        return next;
      }
      return prev;
    }, false);
    if (changed === "marking") {
      let markingChanged = false;
      if (this.props.marking && nextProps.marking) {
        markingChanged = !(
          this.props.marking.marked === nextProps.marking.marked &&
          this.props.marking.selected === nextProps.marking.selected &&
          this.props.marking.disabled === nextProps.marking.disabled
        );
      } else {
        markingChanged = true;
      }
      // console.log('marking changed', markingChanged);
      return markingChanged;
    } else {
      // console.log('changed', changed);
      return !!changed;
    }
  }

  render() {
    const { activitiesLog } = this.props;
    let containerStyle = [this.style.base];
    let textStyle = [this.style.text];

    console.log("activitiesLog: ", activitiesLog);

    let marking = this.props.marking || {};
    if (marking && marking.constructor === Array && marking.length) {
      marking = {
        marking: true
      };
    }
    const isDisabled =
      typeof marking.disabled !== "undefined"
        ? marking.disabled
        : this.props.state === "disabled";

    if (marking.selected) {
      containerStyle.push(this.style.selected);
    } else if (isDisabled) {
      textStyle.push(this.style.disabledText);
    } else if (this.props.state === "today") {
      textStyle.push(this.style.todayText);
    }

    if (marking.customStyles && typeof marking.customStyles === "object") {
      const styles = marking.customStyles;
      if (styles.container) {
        if (styles.container.borderRadius === undefined) {
          styles.container.borderRadius = 16;
        }
        containerStyle.push(styles.container);
      }
      if (styles.text) {
        textStyle.push(styles.text);
      }
    }

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={this.onDayPress}
        onLongPress={this.onDayLongPress}
        activeOpacity={marking.activeOpacity}
        disabled={marking.disableTouchEvent}
      >
        <Text allowFontScaling={false} style={textStyle}>
          {String(this.props.children)}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Day;
