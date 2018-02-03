import React, { Component } from "react";
import { View, TouchableHighlight, ListView } from "react-native";
import {
  Text,
  Container,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  List,
  ListItem,
  Card,
  CardItem,
  H1,
  Item,
  Label,
  Form
} from "native-base";
import icons from "../../icons";

const ActivityItem = ({ activity }) => (
  <ListItem icon key={activity.id}>
    <Left>
      {icons[activity.icon]({
        key: activity.icon,
        style: {
          marginLeft: 10,
          fontSize: 20
        }
      })}
    </Left>
    <Body>
      <Text> {activity.title} </Text>
    </Body>
  </ListItem>
);

export default class ActivityItemList extends Component {
  state = {
    isRenderComplete: true
  };
  forceRerender = () => {
    this.setState({
      ...this.state,
      isRenderComplete: false
    });
    setTimeout(() => {
      this.setState({
        ...this.state,
        isRenderComplete: true
      });
    }, 0);
  };
  render() {
    const { onInfoPressed, onDeletePressed, activities } = this.props;
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    return this.state.isRenderComplete ? (
      <List
        closeOnRowBeginSwipe={true}
        enableEmptySections={true}
        dataSource={dataSource.cloneWithRows(activities)}
        renderRow={activity => <ActivityItem activity={activity} />}
        renderLeftHiddenRow={data => (
          <Button
            full
            onPress={e => {
              console.log(e.target);
              onInfoPressed(data);
            }}
          >
            <Icon active name="information-circle" />
          </Button>
        )}
        renderRightHiddenRow={(data, secId, rowId, rowMap) => (
          <Button
            full
            danger
            onPress={() => {
              onDeletePressed(data);
              this.forceRerender();
            }}
          >
            <Icon active name="trash" />
          </Button>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    ) : null;
  }
}
