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
    <Calendar style={{ elevation: 2 }} />
    <Content>
      <List>
        {availableActivities.map(activity => (
          <ListItem icon key={activity.id}>
            <Left>
              <Icon name="plane" />
            </Left>
            <Body>
              <Text> {activity.title} </Text>
            </Body>
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
