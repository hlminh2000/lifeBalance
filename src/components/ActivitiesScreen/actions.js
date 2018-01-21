

export default {
  "TEST": {
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
  "ACTIVITIES_SCREEN/NEW_ACTIVITY_TITLE_CHANGE": {
    type: "ACTIVITIES_SCREEN/NEW_ACTIVITY_TITLE_CHANGE",
    create: (newText) => ({
      type: "ACTIVITIES_SCREEN/NEW_ACTIVITY_TITLE_CHANGE",
      text: newText,
    })
  }
}
