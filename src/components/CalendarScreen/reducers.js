import DateUtil from "../../utils/DateUtils";
import authActions from "../AuthScreen/actions";
import actions from "./actions";
import moment from "moment";
import DateUtils from "../../utils/DateUtils";

const initialState = {
  selectedDateString: DateUtils.toCalendarString(DateUtils.getDateString()),
  activitiesLog: [],
  newStagingActivityLog: null
};

const newActivityLog = activityId => ({
  id: `${activityId}_${DateUtil.now()}`,
  activityId: activityId,
  timestamp: Date.now(),
  start: new moment().subtract(1, "h").unix(),
  end: new moment().unix()
});

export default (state = initialState, action) => {
  switch (action.type) {
    case authActions["AUTH/LOGIN_COMPLETE"].type:
      return {
        ...state
      };
    case actions["CALENDAR_SCREEN/STAGING_ACTIVITY_TIME_CHANGE"].type:
      return {
        ...state,
        newStagingActivityLog: {
          ...state.newStagingActivityLog,
          start: action.payload.from,
          end: action.payload.to
        }
      };
    case actions["CALENDAR_SCREEN/NEW_STAGING_ACTIVITY_CANCEL"].type:
      return {
        ...state,
        newStagingActivityLog: null
      };
    case actions["CALENDAR_SCREEN/NEW_STAGING_ACTIVITY"].type:
      return {
        ...state,
        newStagingActivityLog: newActivityLog(action.payload.activityId)
      };
    case actions["CALENDAR_SCREEN/NEW_ACTIVITY_LOG"].type:
      return {
        ...state,
        activitiesLog: {
          ...state.activitiesLog,
          [action.payload.selectedDateString]: [
            ...(state.activitiesLog[action.payload.selectedDateString] || []),
            state.newStagingActivityLog
          ]
        },
        newStagingActivityLog: null
      };
    case actions["CALENDAR_SCREEN/DATE_SELECT"].type:
      return {
        ...state,
        selectedDateString: action.payload.dateString
      };
    case actions["CALENDAR_SCREEN/REMOVE_ACTIVITY_LOG"].type:
      return {
        ...state,
        activitiesLog: {
          ...state.activitiesLog,
          [action.payload.selectedDateString]: state.activitiesLog[
            action.payload.selectedDateString
          ].filter(
            log =>
              !(
                log.activityId === action.payload.activityId &&
                DateUtils.toCalendarString(
                  DateUtils.getDateString(log.timestamp)
                ) === state.selectedDateString
              )
          )
        }
      };
    default:
      return state;
  }
};
