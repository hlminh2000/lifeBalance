import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
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

const CalendarScreen = ({ day, navigation, availableActivities }) => (
  <Container>
    <HeaderBar navigation={navigation} title="My Calendar" />
    <Calendar />
    <Content>
      <List>
        {availableActivities.map(activity => (
          <ListItem key={activity.id}>
            <Text>{activity.title}</Text>
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
