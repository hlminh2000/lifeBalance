import React, { Component } from "react";
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
import Day from "./DayComponent";
import { fetchData } from "../../utils/api";
import { updateUserActivityLogs } from "../../utils/api/queries";
import { userContextType } from "../../utils/auth";

const dayStart = () =>
  moment()
    .startOf("day")
    .unix();

const toUnix = interdayMinutes => dayStart() + interdayMinutes * 60;

const WithContext = class extends Component {
  static contextTypes = { ...userContextType };

  render() {
    const { user } = this.context;
    const CalendarScreen = connect(
      ({
        activitiesScreen: { activityList },
        calendarScreen: {
          selectedDateString,
          activitiesLog,
          newStagingActivityLog
        }
      }) => ({
        activityList,
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
        deregisterActivityLog: (activityId, selectedDateString) =>
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
          dispatch(
            actions["CALENDAR_SCREEN/NEW_STAGING_ACTIVITY_CANCEL"].create()
          ),
        registerNewActivityLog: selectedDateString =>
          dispatch(
            actions["CALENDAR_SCREEN/NEW_ACTIVITY_LOG"].create(
              selectedDateString
            )
          ),
        onDaySelect: dateString =>
          dispatch(actions["CALENDAR_SCREEN/DATE_SELECT"].create(dateString))
      }),
      (propsFromState, propsFromDispatch, ownProps) => ({
        ...propsFromState,
        ...propsFromDispatch,
        ...ownProps,
        onNewActivityTimeSet: selectedDateString => {
          propsFromDispatch.registerNewActivityLog(selectedDateString);
          const { newStagingActivityLog, activitiesLog } = propsFromState;
          user.getIdToken().then(idToken => {
            const body = updateUserActivityLogs({
              idToken,
              clientTimestamp: Date.now(),
              activityLogs: [
                ...(activitiesLog[selectedDateString] || []),
                newStagingActivityLog
              ],
              date: selectedDateString
            });
            fetchData({ body });
          });
        },
        onActivityUncheck: (_activityId, selectedDateString) => {
          propsFromDispatch.deregisterActivityLog(
            _activityId,
            selectedDateString
          );
          const { activitiesLog } = propsFromState;
          user.getIdToken().then(idToken => {
            const body = updateUserActivityLogs({
              idToken,
              clientTimestamp: Date.now(),
              activityLogs: (activitiesLog[selectedDateString] || []).filter(
                ({ activityId }) => activityId !== _activityId
              ),
              date: selectedDateString
            });
            fetchData({ body });
          });
        }
      })
    )(
      ({
        day,
        navigation,
        activityList,
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
            dayComponent={props => (
              <Day {...{ ...props, activitiesLog, activityList }} />
            )}
          />
          <Content>
            <List>
              {activityList.map(({ id, icon, title }) => {
                const isChecked = (
                  activitiesLog[selectedDateString] || []
                ).some(
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
            title={(() => {
              const activeActivity = activityList.find(
                ({ id }) =>
                  newStagingActivityLog
                    ? newStagingActivityLog.activityId === id
                    : false
              );
              return activeActivity ? activeActivity.title : "";
            })()}
            minValueInitial={
              newStagingActivityLog &&
              Math.round((newStagingActivityLog.start - dayStart()) / 60)
            }
            maxValueInitial={
              newStagingActivityLog &&
              Math.round((newStagingActivityLog.end - dayStart()) / 60)
            }
            onTimeRangeChange={debounce(onTimeRangeChange, 10)}
            onCancel={onNewActivityCancel}
            onComplete={() => onNewActivityTimeSet(selectedDateString)}
            isVisible={!!newStagingActivityLog}
          />
        </Container>
      )
    );

    return <CalendarScreen {...this.props} />;
  }
};

export default WithContext;
