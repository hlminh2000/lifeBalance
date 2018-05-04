import { combineReducers } from "redux";
import activitiesScreenReducer from "./components/ActivitiesScreen/reducers.js";
import calendarScreenReducer from "./components/CalendarScreen/reducers.js";
import authReducer from "./components/AuthScreen/reducers.js";
import moment from "moment";

export const mutativeActionTypes = [
  "ACTIVITIES_SCREEN/NEW_ACTIVITY_COMPLETE",
  "ACTIVITIES_SCREEN/ACTIVITY_DELETE",
  "CALENDAR_SCREEN/NEW_ACTIVITY_LOG",
  "CALENDAR_SCREEN/REMOVE_ACTIVITY_LOG"
];

const rootReducer = combineReducers({
  activitiesScreen: activitiesScreenReducer,
  calendarScreen: calendarScreenReducer,
  auth: authReducer,
  lastModified: (state = null, action) =>
    mutativeActionTypes.some(type => action.type === type)
      ? new moment().valueOf()
      : state
});

export default rootReducer;
