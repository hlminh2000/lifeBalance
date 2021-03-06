import React from "react";
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
import STYLE from "../../styleVariable.js";

const HeaderBar = ({ title, navigation }) => (
  <Header style={{ backgroundColor: STYLE.COLOR_PRIMARY }}>
    <Left>
      <Button
        transparent
        onPress={() => {
          navigation.navigate("DrawerOpen");
        }}
      >
        <Icon style={{ color: "#ffffff" }} name="menu" />
      </Button>
    </Left>
    <Body>
      <Title>{title}</Title>
    </Body>
    <Right />
  </Header>
);

export default HeaderBar;
