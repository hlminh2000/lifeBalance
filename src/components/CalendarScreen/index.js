import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, CheckBox, TouchableHighlight } from "react-native";
import moment from "moment";
import { debounce } from "lodash";
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

import State from "../State.js";
import actions from "./actions";
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
  onTimeRangeChange = range => {
    console.log(range);
  },
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
                !isDisabled
                  ? isChecked
                    ? onActivityUncheck(id, selectedDateString)
                    : onActivityCheck(id, selectedDateString)
                  : null
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
                  <CheckBox value={isChecked} />
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
      minValueInitial={
        newStagingActivityLog &&
        Math.round((newStagingActivityLog.start - dayStart()) / 60)
      }
      maxValueInitial={
        newStagingActivityLog &&
        Math.round((newStagingActivityLog.end - dayStart()) / 60)
      }
      onTimeRangeChange={debounce(onTimeRangeChange, 100)}
      onCancel={onNewActivityCancel}
      onComplete={() => onNewActivityTimeSet(selectedDateString)}
      isVisible={!!newStagingActivityLog}
    />
  </Container>
);

const dayStart = () =>
  moment()
    .startOf("day")
    .unix();

const toUnix = interdayMinutes => dayStart() + interdayMinutes * 60;

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
    onTimeRangeChange: ({ min, max }) =>
      dispatch(
        actions["CALENDAR_SCREEN/STAGING_ACTIVITY_TIME_CHANGE"].create({
          from: toUnix(min),
          to: toUnix(max)
        })
      ),
    onActivityUncheck: (activityId, selectedDateString) =>
      dispatch(
        actions["CALENDAR_SCREEN/REMOVE_ACTIVITY_LOG"].create(
          activityId,
          selectedDateString
        )
      ),
    onActivityCheck: (activityId, selectedDateString) =>
      dispatch(
        actions["CALENDAR_SCREEN/NEW_STAGING_ACTIVITY"].create(activityId)
      ),
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
