import actions from "./actions.js";
import authActions from "../AuthScreen/actions";

const initialState = {
  activityList: [],
  editStagingActivity: null,
  newStagingActivity: null
};

const newActivity = () => {
  const now = Date.now();
  return {
    icon: "DEFAULT",
    title: "",
    createdAt: now,
    id: `ACTIVITY_${now}_${Math.random()}`,
    isActive: true,
    isArchived: false
  };
};

export default (state = initialState, { type, payload }) => {
  const output = (() => {
    switch (type) {
      case "ONLINE_USER_RESTORE":
        const { user: { activities, activityLogs } } = payload;
        return {
          ...state,
          activityList: activities.map(({ icon, ...rest }) => ({
            ...rest,
            icon: icon || "DEFAULT"
          }))
        };
      case authActions["AUTH/LOGIN_COMPLETE"].type:
        return {
          ...state
        };
      case actions["ACTIVITIES_SCREEN/STAGE_NEW_ACTIVITY"].type:
        return {
          ...state,
          newStagingActivity: newActivity()
        };
      case actions["ACTIVITIES_SCREEN/NEW_ACTIVITY_TITLE_CHANGE"].type:
        return {
          ...state,
          newStagingActivity: {
            ...state.newStagingActivity,
            title: payload.text
          }
        };
      case actions["ACTIVITIES_SCREEN/NEW_ACTIVITY_ICON_SELECT"].type:
        return {
          ...state,
          newStagingActivity: {
            ...state.newStagingActivity,
            icon: payload.iconName
          }
        };
      case actions["ACTIVITIES_SCREEN/NEW_ACTIVITY_COMPLETE"].type:
        return {
          ...state,
          newStagingActivity: null,
          activityList: [...state.activityList, state.newStagingActivity]
        };
      case actions["ACTIVITIES_SCREEN/NEW_ACTIVITY_CANCEL"].type:
        return {
          ...state,
          newStagingActivity: null
        };
      case actions["ACTIVITIES_SCREEN/ACTIVITY_DELETE"].type:
        return {
          ...state,
          activityList: state.activityList.filter(
            activity => activity.id != payload.activityId
          )
        };
      default:
        return state;
    }
  })();
  return output;
};
