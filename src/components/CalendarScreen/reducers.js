import { groupBy } from "lodash";
import DateUtil from "../../utils/DateUtils";
import authActions from "../AuthScreen/actions";
import actions from "./actions";
import moment from "moment";
import DateUtils from "../../utils/DateUtils";

const initialState = {
  selectedDateString: DateUtils.toCalendarString(DateUtils.getDateString()),
  activitiesLog: {},
  newStagingActivityLog: null
};

const newActivityLog = activityId => ({
  id: `${activityId}_${DateUtil.now()}`,
  activityId: activityId,
  timestamp: Date.now(),
  start: new moment().subtract(1, "h").unix(),
  end: new moment().unix()
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case authActions["AUTH/LOGIN_COMPLETE"].type:
      return {
        ...state
      };
    case "ONLINE_USER_RESTORE":
      const { user: { activities, activityLogs } } = payload;
      const activitiesLog = groupBy(activityLogs, "date");
      return {
        ...state,
        activitiesLog
      };
    case actions["CALENDAR_SCREEN/STAGING_ACTIVITY_TIME_CHANGE"].type:
      return {
        ...state,
        newStagingActivityLog: {
          ...state.newStagingActivityLog,
          start: payload.from,
          end: payload.to
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
        newStagingActivityLog: newActivityLog(payload.activityId)
      };
    case actions["CALENDAR_SCREEN/NEW_ACTIVITY_LOG"].type:
      return {
        ...state,
        activitiesLog: {
          ...state.activitiesLog,
          [payload.selectedDateString]: [
            ...(state.activitiesLog[payload.selectedDateString] || []),
            state.newStagingActivityLog
          ]
        },
        newStagingActivityLog: null
      };
    case actions["CALENDAR_SCREEN/DATE_SELECT"].type:
      return {
        ...state,
        selectedDateString: payload.dateString
      };
    case actions["CALENDAR_SCREEN/REMOVE_ACTIVITY_LOG"].type:
      return {
        ...state,
        activitiesLog: {
          ...state.activitiesLog,
          [payload.selectedDateString]: state.activitiesLog[
            payload.selectedDateString
          ].filter(
            log =>
              !(
                log.activityId === payload.activityId &&
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
