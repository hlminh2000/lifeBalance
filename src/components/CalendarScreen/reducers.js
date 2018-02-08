import DateUtil from "../../utils/DateUtils";
import actions from "./actions";
import moment from "moment";

const initialState = {
  currentDate: DateUtil.getCurrentDateString(),
  activitiesLog: []
};

const newActivityLog = activityId => ({
  id: `${activityId}_${DateUtil.now()}`,
  activityId: activityId,
  timestamp: DateUtil.getCurrentDateString(),
  start: new moment().subtract(1, "h").format(),
  end: DateUtil.getCurrentDateString()
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actions["CALENDAR_SCREEN/NEW_ACTIVITY_LOG"].type:
      return {
        ...state,
        activitiesLog: [
          ...state.activitiesLog,
          newActivityLog(action.payload.activityId)
        ]
      };
    default:
      return state;
  }
};
