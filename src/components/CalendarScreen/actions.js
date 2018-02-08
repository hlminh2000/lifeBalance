export default {
  "CALENDAR_SCREEN/NEW_ACTIVITY_LOG": {
    type: "CALENDAR_SCREEN/NEW_ACTIVITY_LOG",
    create: activityId => ({
      type: "CALENDAR_SCREEN/NEW_ACTIVITY_LOG",
      payload: { activityId }
    })
  }
};
