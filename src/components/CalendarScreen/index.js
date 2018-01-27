import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
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
  Icon
} from "native-base";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import HeaderBar from "../HeaderBar/index.js";

const CalendarScreen = ({ day, navigation }) => (
  <Container>
    <HeaderBar navigation={navigation} title="My Calendar" />
    <Content>
      <Calendar />
    </Content>
  </Container>
);

export default connect(state => ({}), dispatch => ({}))(CalendarScreen);
