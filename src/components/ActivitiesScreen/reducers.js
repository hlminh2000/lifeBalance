import actions from './actions.js'

const initialState = {
  activityList: [],
  editStagingActivity: null,
  newStagingActivity: null
}

const newActivity = () => {
  const now = Date.now()
  return {
    icon: "DEFAULT",
    title: "",
    createdAt: now,
    id: `ACTIVITY_${now}_${Math.random()}`,
    isActive: true,
    isArchived: false,
  }
}

export default (state = initialState, action) => {
  const output = (() => {
    switch (action.type) {
      case actions["ACTIVITIES_SCREEN/STAGE_NEW_ACTIVITY"].type:
        return {
          ...state,
          newStagingActivity: newActivity()
        }
      case actions["ACTIVITIES_SCREEN/NEW_ACTIVITY_TITLE_CHANGE"].type:
        return {
          ...state,
          newStagingActivity: {
            ...state.newStagingActivity,
            title: action.payload.text
          }
        }
      case actions["ACTIVITIES_SCREEN/NEW_ACTIVITY_COMPLETE"].type:
        return {
          ...state,
          newStagingActivity: null,
          activityList: [
            ...state.activityList,
            state.newStagingActivity
          ]
        }
      case actions["ACTIVITIES_SCREEN/NEW_ACTIVITY_CANCEL"].type:
        return {
          ...state,
          newStagingActivity: null,
        }
      case actions["ACTIVITIES_SCREEN/ACTIVITY_DELETE"].type:
        return {
          ...state,
          activityList: state.activityList.filter(activity => (
            activity.id != action.payload.activityId
          ))
        }
      default:
        return {
          ...state
        }
    }
  })()
  return output
}
