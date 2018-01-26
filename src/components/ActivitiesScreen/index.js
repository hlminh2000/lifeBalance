import React, { Component } from 'react';
import { Text, View, TouchableHighlight, ListView } from 'react-native'
import {
  Container, Content, Button,
  Left, Right, Body,
  Card, CardItem, H1,
  Label, Form
} from 'native-base'
import FAB from 'react-native-fab'
import HeaderBar from '../HeaderBar/index.js'
import { connect } from 'react-redux'
import actions from './actions.js'
import CheckBox from '../reusables/Checkbox.js'
import Input from '../reusables/Input.js'
import Modal from "react-native-modal"
import ActivityItemList from './ActivityItemList/index.js'

const ActivityEditModal = ({
  activity,
  onCancel,
  onComplete,
  onTitleChange,
}) => (
  <Modal isVisible={activity !== null}>
    <Card style={{
      flex: 0,
      marginLeft: 20,
      marginRight: 20,
      paddingTop: 10,
      paddingBottom: 10,
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
            <Input
              label={ "Title" }
              value={ activity ? activity.title : "" }
              onChangeText={ onTitleChange }
            />
          </Body>
        </Left>
      </CardItem>
      <CardItem>
        <Left></Left>
        <Body></Body>
        <Right>
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight onPress={ onCancel }>
              <Text>Cancel</Text>
            </TouchableHighlight>
            <Text style={{ width: 30 }}> </Text>
            <TouchableHighlight onPress={ onComplete }>
              <Text>Done</Text>
            </TouchableHighlight>
          </View>
        </Right>
      </CardItem>
    </Card>
  </Modal>
)

const ActivitiesScreen = ({
  activities,
  editingActivityId,
  newStagingActivity,
  onFabTapped,
  onNewActivityTitleChange,
  onNewActivityComplete,
  onNewActivityCancel,
  navigation,
  onActivityDelete,
 }) => {
  return (
    <Container>
      <HeaderBar navigation={navigation} title="My Activities"/>
      <Content>
        <ActivityItemList
          onInfoPressed={ activity => console.log(activity) }
          onDeletePressed={ activity => onActivityDelete(activity.id) }
          activities={ activities }
        />
      </Content>
      <FAB buttonColor="red" onClickAction={ onFabTapped } />
      <ActivityEditModal
        activity={ newStagingActivity }
        onCancel={ onNewActivityCancel }
        onComplete={ onNewActivityComplete }
        onTitleChange={ onNewActivityTitleChange }
      />
    </Container>
  )
}

export default connect(
  state => ({
    activities: state.activitiesScreen.activityList,
    editingActivityId: state.activitiesScreen.currentEditingActivityId,
    newStagingActivity: state.activitiesScreen.newStagingActivity,
  }),
  dispatch => ({
    onFabTapped: (activity) => dispatch(
      actions['ACTIVITIES_SCREEN/STAGE_NEW_ACTIVITY'].create()),
    onNewActivityTitleChange: (newText) =>  dispatch(
      actions['ACTIVITIES_SCREEN/NEW_ACTIVITY_TITLE_CHANGE'].create(newText)),
    onNewActivityComplete: () => dispatch(
      actions['ACTIVITIES_SCREEN/NEW_ACTIVITY_COMPLETE'].create()),
    onNewActivityCancel: () => dispatch(
      actions['ACTIVITIES_SCREEN/NEW_ACTIVITY_CANCEL'].create()),
    onActivityDelete: (activityId) => dispatch(
      actions['ACTIVITIES_SCREEN/ACTIVITY_DELETE'].create(activityId)),
  })
)(ActivitiesScreen)
