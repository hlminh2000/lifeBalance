import DateUtil from "../../utils/DateUtils";

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
    case "CALENDAR_SCREEN/NEW_ACTIVITY_LOG":
      return {
        ...state,
        activitiesLog: []
      };
    default:
      return state;
  }
};
