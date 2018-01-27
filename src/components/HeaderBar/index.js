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

const HeaderBar = ({ title, navigation }) => (
  <Header>
    <Left>
      <Button
        transparent
        onPress={() => {
          console.log("clicked!!!");
          navigation.navigate("DrawerOpen");
        }}
      >
        <Icon name="menu" />
      </Button>
    </Left>
    <Body>
      <Title>{title}</Title>
    </Body>
    <Right />
  </Header>
);

export default HeaderBar;
