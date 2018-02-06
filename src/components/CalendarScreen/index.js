import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, CheckBox } from "react-native";
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

const CalendarScreen = ({ day, navigation, availableActivities }) => (
  <Container>
    <HeaderBar navigation={navigation} title="My Calendar" />
    <Calendar
      style={{ elevation: 2 }}
      onDayPress={day => {
        console.log("selected day", day);
      }}
    />
    <Content>
      <List>
        {availableActivities.map(activity => (
          <ListItem icon key={activity.id}>
            <Left>
              {icons[activity.icon]({
                key: activity.icon,
                style: {
                  fontSize: 20
                }
              })}
            </Left>
            <Body>
              <Text> {activity.title} </Text>
            </Body>
            <Right>
              <CheckBox />
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
  dispatch => ({})
)(CalendarScreen);
