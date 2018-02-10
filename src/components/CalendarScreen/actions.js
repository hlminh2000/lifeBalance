export default {
  "CALENDAR_SCREEN/NEW_ACTIVITY_LOG": {
    type: "CALENDAR_SCREEN/NEW_ACTIVITY_LOG",
    create: activityId => ({
      type: "CALENDAR_SCREEN/NEW_ACTIVITY_LOG",
      payload: { activityId }
    })
  },
  "CALENDAR_SCREEN/DATE_SELECT": {
    type: "CALENDAR_SCREEN/DATE_SELECT",
    create: dateString => ({
      type: "CALENDAR_SCREEN/DATE_SELECT",
      payload: { dateString }
    })
  }
};
