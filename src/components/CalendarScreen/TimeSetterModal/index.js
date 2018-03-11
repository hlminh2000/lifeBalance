import React, { Component } from "react";
import { Text, View, ListView } from "react-native";
import {
  Container,
  Content,
  Button,
  Left,
  Right,
  Body,
  Card,
  CardItem,
  H1,
  Label,
  Form
} from "native-base";
import Modal from "react-native-modal";
import CircularTimeRangeSelector from "../CircularTimeRangeSelector";

export default ({
  minValueInitial,
  maxValueInitial,
  onTimeRangeChange = () => {},
  onCancel = () => {},
  onComplete = () => {},
  title = "Some Activity",
  ...props
}) => (
  <Modal {...props}>
    <Card
      style={{
        flex: 0,
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 10,
        paddingBottom: 10
      }}
    >
      <CardItem>
        <Left>
          <Body>
            <H1>{title}</H1>
          </Body>
        </Left>
      </CardItem>
      <CircularTimeRangeSelector
        onValueChange={onTimeRangeChange}
        {...{ minValueInitial, maxValueInitial }}
      />
      <CardItem>
        <Left />
        <Body />
        <Right>
          <View style={{ flexDirection: "row" }}>
            <Text onPress={onCancel}>Cancel</Text>
            <Text style={{ width: 30 }}> </Text>
            <Text onPress={onComplete}>Done</Text>
          </View>
        </Right>
      </CardItem>
    </Card>
  </Modal>
);
