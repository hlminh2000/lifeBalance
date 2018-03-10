export default {
  "CALENDAR_SCREEN/DATE_SELECT": {
    type: "CALENDAR_SCREEN/DATE_SELECT",
    create: dateString => ({
      type: "CALENDAR_SCREEN/DATE_SELECT",
      payload: { dateString }
    })
  },
  "CALENDAR_SCREEN/NEW_ACTIVITY_LOG": {
    type: "CALENDAR_SCREEN/NEW_ACTIVITY_LOG",
    create: (activityId, selectedDateString) => ({
      type: "CALENDAR_SCREEN/NEW_ACTIVITY_LOG",
      payload: { activityId, selectedDateString }
    })
  },
  "CALENDAR_SCREEN/REMOVE_ACTIVITY_LOG": {
    type: "CALENDAR_SCREEN/REMOVE_ACTIVITY_LOG",
    create: (activityId, selectedDateString) => ({
      type: "CALENDAR_SCREEN/REMOVE_ACTIVITY_LOG",
      payload: { activityId, selectedDateString }
    })
  },
  "CALENDAR_SCREEN/NEW_STAGING_ACTIVITY": {
    type: "CALENDAR_SCREEN/NEW_STAGING_ACTIVITY",
    create: (activityId) => ({
      type: "CALENDAR_SCREEN/NEW_STAGING_ACTIVITY",
      payload: { activityId }
    })
  }
  "CALENDAR_SCREEN/NEW_STAGING_ACTIVITY_CANCEL": {
    type: "CALENDAR_SCREEN/NEW_STAGING_ACTIVITY_CANCEL",
    create: () => ({
      type: "CALENDAR_SCREEN/NEW_STAGING_ACTIVITY_CANCEL",
      payload: {}
    })
  }
};
