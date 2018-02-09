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

const CalendarScreen = ({
  day,
  navigation,
  availableActivities,
  onActivityCheck,
  currentDayString = DateUtils.getCurrentDateString()
}) => (
  <Container>
    <HeaderBar navigation={navigation} title="My Calendar" />
    <Calendar
      markedDates={{
        [currentDayString]: { selected: true }
      }}
      style={{ elevation: 2 }}
      onDayPress={day => {
        console.log("selected day", day);
      }}
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
              <CheckBox onValueChange={e => onActivityCheck(id)} />
            </Right>
          </ListItem>
        ))}
      </List>
    </Content>
  </Container>
);

export default connect(
  state => ({
    availableActivities: state.activitiesScreen.activityList
  }),
  dispatch => ({
    onActivityCheck: activityId => {
      dispatch(actions["CALENDAR_SCREEN/NEW_ACTIVITY_LOG"].create(activityId));
    }
  })
)(CalendarScreen);
