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
import FAB from "react-native-fab";
import HeaderBar from "../HeaderBar/index.js";
import { connect } from "react-redux";
import actions from "./actions.js";
import CheckBox from "../reusables/Checkbox.js";
import Input from "../reusables/Input.js";
import Modal from "react-native-modal";
import ActivityItemList from "./ActivityItemList/index.js";
import STYLE from "../../styleVariable";
import ActivityEditModal from "./ActivityEditModal";
import { fetchGqlData } from "../../utils/api";
import { updateUserActivities } from "../../utils/api/queries";

const ActivitiesScreen = ({
  activities,
  editingActivityId,
  newStagingActivity,
  onFabTapped,
  onNewActivityTitleChange,
  onNewActivityIconSelect,
  onNewActivityComplete,
  onNewActivityCancel,
  navigation,
  onActivityDelete
}) => (
  <Container>
    <HeaderBar navigation={navigation} title="My Activities" />
    <Content>
      <ActivityItemList
        onInfoPressed={activity => console.log(activity)}
        onDeletePressed={activity => onActivityDelete(activity.id)}
        activities={activities}
      />
    </Content>
    <FAB buttonColor={STYLE.COLOR_PRIMARY} onClickAction={onFabTapped} />
    <ActivityEditModal
      activity={newStagingActivity}
      onCancel={onNewActivityCancel}
      onComplete={onNewActivityComplete}
      onTitleChange={onNewActivityTitleChange}
      onIconSelect={onNewActivityIconSelect}
    />
  </Container>
);

export default connect(
  state => ({
    activities: state.activitiesScreen.activityList,
    editingActivityId: state.activitiesScreen.currentEditingActivityId,
    newStagingActivity: state.activitiesScreen.newStagingActivity,
    lastModified: state.lastModified
  }),
  dispatch => ({
    onFabTapped: activity =>
      dispatch(actions["ACTIVITIES_SCREEN/STAGE_NEW_ACTIVITY"].create()),
    onNewActivityTitleChange: newText =>
      dispatch(
        actions["ACTIVITIES_SCREEN/NEW_ACTIVITY_TITLE_CHANGE"].create(newText)
      ),
    registerNewActivity: () =>
      dispatch(actions["ACTIVITIES_SCREEN/NEW_ACTIVITY_COMPLETE"].create()),
    onNewActivityCancel: () =>
      dispatch(actions["ACTIVITIES_SCREEN/NEW_ACTIVITY_CANCEL"].create()),
    onActivityDelete: activityId =>
      dispatch(actions["ACTIVITIES_SCREEN/ACTIVITY_DELETE"].create(activityId)),
    onNewActivityIconSelect: iconName =>
      dispatch(
        actions["ACTIVITIES_SCREEN/NEW_ACTIVITY_ICON_SELECT"].create(iconName)
      )
  }),
  (propsFromState, propsFromDispatch, ownProps) => ({
    ...ownProps,
    ...propsFromState,
    ...propsFromDispatch,
    onNewActivityComplete: () => {
      propsFromDispatch.registerNewActivity();
      // getUserToken().then(idToken =>
      const query = updateUserActivities({
        // idToken,
        clientTimestamp: Date.now(),
        activitiesSet: [
          propsFromState.activities,
          propsFromState.newStagingActivity
        ]
      });
      fetchGqlData({
        query
      });
      // );
    }
  })
)(ActivitiesScreen);
