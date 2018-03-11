import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, CheckBox, TouchableHighlight } from "react-native";
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
  // CheckBox
} from "native-base";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import HeaderBar from "../HeaderBar/index.js";
import icons from "../icons";
import DateUtils from "../../utils/DateUtils";
import TimeSetterModal from "./TimeSetterModal";

const CalendarScreen = ({
  day,
  navigation,
  availableActivities,
  onActivityCheck,
  onActivityUncheck,
  selectedDateString,
  isActivityActiveForDate = () => {},
  onNewActivityCancel = () => {},
  onNewActivityTimeSet = () => {},
  newStagingActivityLog,
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
        {availableActivities.map(({ id, icon, title }) => {
          const isChecked = (activitiesLog[selectedDateString] || []).some(
            log =>
              log.activityId === id &&
              DateUtils.toCalendarString(
                DateUtils.getDateString(log.timestamp)
              ) === selectedDateString
          );
          const isDisabled = !(
            selectedDateString ===
            DateUtils.toCalendarString(DateUtils.getDateString())
          );
          return (
            <ListItem
              icon
              key={id}
              onPress={e =>
                isChecked
                  ? onActivityUncheck(id, selectedDateString)
                  : onActivityCheck(id, selectedDateString)
              }
            >
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
              <Right style={{ position: "relative" }}>
                <View style={{ position: "relative" }}>
                  <CheckBox disabled={isDisabled} value={isChecked} />
                  <View
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: 50
                    }}
                  >
                    <Text style={{ height: 50 }}>{""}</Text>
                  </View>
                </View>
              </Right>
            </ListItem>
          );
        })}
      </List>
    </Content>
    <TimeSetterModal
      onCancel={onNewActivityCancel}
      onComplete={() => onNewActivityTimeSet(selectedDateString)}
      isVisible={!!newStagingActivityLog}
    />
  </Container>
);

export default connect(
  ({
    activitiesScreen: { activityList },
    calendarScreen: { selectedDateString, activitiesLog, newStagingActivityLog }
  }) => ({
    availableActivities: activityList,
    selectedDateString,
    activitiesLog,
    newStagingActivityLog
  }),
  dispatch => ({
    onActivityUncheck: (activityId, selectedDateString) => {
      console.log(activityId);
      return dispatch(
        actions["CALENDAR_SCREEN/REMOVE_ACTIVITY_LOG"].create(
          activityId,
          selectedDateString
        )
      );
    },
    onActivityCheck: (activityId, selectedDateString) => {
      console.log(activityId);
      return dispatch(
        actions["CALENDAR_SCREEN/NEW_STAGING_ACTIVITY"].create(activityId)
      );
    },
    onNewActivityCancel: () =>
      dispatch(actions["CALENDAR_SCREEN/NEW_STAGING_ACTIVITY_CANCEL"].create()),
    onNewActivityTimeSet: selectedDateString =>
      dispatch(
        actions["CALENDAR_SCREEN/NEW_ACTIVITY_LOG"].create(selectedDateString)
      ),
    onDaySelect: dateString =>
      dispatch(actions["CALENDAR_SCREEN/DATE_SELECT"].create(dateString))
  })
)(CalendarScreen);
