import React, { Component } from "react";
import { Text, View, TouchableHighlight, ListView } from "react-native";
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
import Input from "../../reusables/Input.js";
import Modal from "react-native-modal";
import IconPicker from "../IconPicker";

export default ({ activity, onCancel, onComplete, onTitleChange }) => (
  <Modal isVisible={activity !== null}>
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
            <H1>Activity</H1>
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Left>
          <Body>
            <Input
              autoFocus={true}
              label={"Title"}
              value={activity ? activity.title : ""}
              onChangeText={onTitleChange}
            />
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <IconPicker />
      </CardItem>
      <CardItem>
        <Left />
        <Body />
        <Right>
          <View style={{ flexDirection: "row" }}>
            <TouchableHighlight onPress={onCancel}>
              <Text>Cancel</Text>
            </TouchableHighlight>
            <Text style={{ width: 30 }}> </Text>
            <TouchableHighlight onPress={onComplete}>
              <Text>Done</Text>
            </TouchableHighlight>
          </View>
        </Right>
      </CardItem>
    </Card>
  </Modal>
);
