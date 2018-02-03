export default {
  TEST: {
    type: "TEST",
    create: () => ({
      type: "TEST",
      payload: {}
    })
  },
  "ACTIVITIES_SCREEN/COMMIT_NEW_ACTIVITY": {
    type: "ACTIVITIES_SCREEN/COMMIT_NEW_ACTIVITY",
    create: () => ({
      type: "ACTIVITIES_SCREEN/COMMIT_NEW_ACTIVITY",
      payload: {}
    })
  },
  "ACTIVITIES_SCREEN/STAGE_NEW_ACTIVITY": {
    type: "ACTIVITIES_SCREEN/STAGE_NEW_ACTIVITY",
    create: () => ({
      type: "ACTIVITIES_SCREEN/STAGE_NEW_ACTIVITY",
      payload: {}
    })
  },
  "ACTIVITIES_SCREEN/NEW_ACTIVITY_COMPLETE": {
    type: "ACTIVITIES_SCREEN/NEW_ACTIVITY_COMPLETE",
    create: () => ({
      type: "ACTIVITIES_SCREEN/NEW_ACTIVITY_COMPLETE",
      payload: {}
    })
  },
  "ACTIVITIES_SCREEN/NEW_ACTIVITY_CANCEL": {
    type: "ACTIVITIES_SCREEN/NEW_ACTIVITY_CANCEL",
    create: () => ({
      type: "ACTIVITIES_SCREEN/NEW_ACTIVITY_CANCEL",
      payload: {}
    })
  },
  "ACTIVITIES_SCREEN/NEW_ACTIVITY_TITLE_CHANGE": {
    type: "ACTIVITIES_SCREEN/NEW_ACTIVITY_TITLE_CHANGE",
    create: newText => ({
      type: "ACTIVITIES_SCREEN/NEW_ACTIVITY_TITLE_CHANGE",
      payload: {
        text: newText
      }
    })
  },
  "ACTIVITIES_SCREEN/ACTIVITY_DELETE": {
    type: "ACTIVITIES_SCREEN/ACTIVITY_DELETE",
    create: activityId => ({
      type: "ACTIVITIES_SCREEN/ACTIVITY_DELETE",
      payload: {
        activityId: activityId
      }
    })
  },
  "ACTIVITIES_SCREEN/NEW_ACTIVITY_ICON_SELECT": {
    type: "ACTIVITIES_SCREEN/NEW_ACTIVITY_ICON_SELECT",
    create: iconName => ({
      type: "ACTIVITIES_SCREEN/NEW_ACTIVITY_ICON_SELECT",
      payload: {
        iconName: iconName
      }
    })
  }
};
