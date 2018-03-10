import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, CheckBox } from "react-native";
import State from "../State.js";
import actions from "./actions";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  List,
  ListItem,
  Text
} from "native-base";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import HeaderBar from "../HeaderBar/index.js";
import icons from "../icons";
import DateUtils from "../../utils/DateUtils";
import CircularSlider from "./CircularSlider";

const CalendarScreen = ({
  day,
  navigation,
  availableActivities,
  onActivityCheck,
  selectedDateString,
  isActivityActiveForDate = () => {},
  onDaySelect,
  activitiesLog
}) => (
  <Container>
    <HeaderBar navigation={navigation} title="My Calendar" />
    <Calendar
      markedDates={{
        ...(selectedDateString
          ? {
              [selectedDateString]: { selected: true }
            }
          : {})
      }}
      style={{ elevation: 2 }}
      onDayPress={day => {
        onDaySelect(day.dateString);
      }}
      dayComponent={
        null
      //   ({ date, state }) => {
      //   return (
      //     <View style={{ flex: 1 }}>
      //       <Text
      //         style={{
      //           textAlign: "center",
      //           color: state === "disabled" ? "gray" : "black"
      //         }}
      //       >
      //         {date.day}
      //       </Text>
      //     </View>
      //   );
      // }
      }
    />
    <Content>
      <List>
        {availableActivities.map(({ id, icon, title }) => (
          <ListItem icon key={id}>
            <Left>
              {icons[icon]({
                key: icon,
                style: {
                  fontSize: 20
                }
              })}
            </Left>
            <Body>
              <Text> {title} </Text>
            </Body>
            <Right>
              <CheckBox
                disabled={
                  !(
                    selectedDateString ===
                    DateUtils.toCalendarString(DateUtils.getDateString())
                  )
                }
                value={
                  (activitiesLog[selectedDateString] || []).filter(
                    log =>
                      log.activityId === id &&
                      DateUtils.toCalendarString(
                        DateUtils.getDateString(log.timestamp)
                      ) === selectedDateString
                  ).length > 0
                }
                onValueChange={e => onActivityCheck(id, e, selectedDateString)}
              />
            </Right>
          </ListItem>
        ))}
      </List>
    </Content>
  </Container>
);

export default connect(
  state => ({
    availableActivities: state.activitiesScreen.activityList,
    selectedDateString: state.calendarScreen.selectedDateString,
    activitiesLog: state.calendarScreen.activitiesLog
  }),
  dispatch => ({
    onActivityCheck: (activityId, isChecked, selectedDateString) => {
      if (isChecked) {
        dispatch(
          actions["CALENDAR_SCREEN/NEW_ACTIVITY_LOG"].create(
            activityId,
            selectedDateString
          )
        );
      } else {
        dispatch(
          actions["CALENDAR_SCREEN/REMOVE_ACTIVITY_LOG"].create(
            activityId,
            selectedDateString
          )
        );
      }
    },
    onDaySelect: dateString =>
      dispatch(actions["CALENDAR_SCREEN/DATE_SELECT"].create(dateString))
  })
)(CalendarScreen);
