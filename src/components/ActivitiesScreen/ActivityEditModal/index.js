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
import Input from "../../reusables/Input.js";
import Modal from "react-native-modal";
import IconPicker from "../IconPicker";

export default ({
  activity,
  onCancel,
  onComplete,
  onTitleChange,
  onIconSelect
}) => (
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
        <IconPicker
          selectedIcon={activity ? activity.icon : ""}
          onSelect={onIconSelect}
        />
      </CardItem>
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
