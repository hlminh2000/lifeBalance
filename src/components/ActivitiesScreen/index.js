import React, { Component } from 'react';
import { Text, View } from 'react-native'
import {
  Container, Content, Button,
  Left, Right, Body, Icon, List,
  ListItem, Card, CardItem, H1,
  Input, Item, Label
} from 'native-base'
import FAB from 'react-native-fab'
import HeaderBar from '../HeaderBar/index.js'
import { connect } from 'react-redux'
import actions from './actions.js'
import CheckBox from '../reusables/Checkbox.js'
import Modal from "react-native-modal";

const activitiesList = (activities) => (
  activities.map(activity => (
    <ListItem icon key={activity.id}>
      <Left>
        <Icon name="plane" />
      </Left>
      <Body>
        <Text> {activity.title} </Text>
      </Body>
      <Right>
        <CheckBox checked={activity.isActive}/>
      </Right>
    </ListItem>
  ))
)

const ActivityEditModal = ({
  activity,
  onCancel,
  onComplete,
  onTitleChange,
}) => (
  <Modal isVisible={activity !== null}>
    <Card style={{
        maxHeight: 500,
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 10
      }}>
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
            <Item stackedLabel>
              <Label>Title</Label>
              <Input onChangeText={(text) => onTitleChange(text)}/>
            </Item>
          </Body>
        </Left>
      </CardItem>
    </Card>
  </Modal>
)

const ActivitiesScreen = ({
  activities,
  editingActivityId,
  newStagingActivity,
  onFabTapped,
  onNewActivityTitleChange
 }) => {
  return (
    <Container>
      <HeaderBar title="My Activities"/>
      <Content>
        <List>{ activitiesList(activities) }</List>
      </Content>
      <FAB buttonColor="red" onClickAction={ onFabTapped } />
      <ActivityEditModal
        activity={ newStagingActivity }
        onCancel={() => {}}
        onComplete={() => {}}
        onTitleChange={() => {onNewActivityTitleChange()}}
      />
    </Container>
  )
}

export default connect(
  state => ({
    activities: state.activitiesScreen.activityList,
    editingActivityId: state.activitiesScreen.currentEditingActivityId,
    newStagingActivity: state.activitiesScreen.newStagingActivity
  }),
  dispatch => ({
    onFabTapped: (activity) => dispatch(
      actions['ACTIVITIES_SCREEN/STAGE_NEW_ACTIVITY'].create())
    onNewActivityTitleChange: (newText) => dispatch(
      actions['ACTIVITIES_SCREEN/NEW_ACTIVITY_TITLE_CHANGE'].create(newText))
  })
)(ActivitiesScreen)
