import { combineReducers } from "redux";
import activitiesScreenReducer from "./components/ActivitiesScreen/reducers.js";
import calendarScreenReducer from "./components/CalendarScreen/reducers.js";
import authReducer from "./components/AuthScreen/reducers.js";

const rootReducer = combineReducers({
  activitiesScreen: activitiesScreenReducer,
  calendarScreen: calendarScreenReducer,
  auth: authReducer,
  lastModified: (state = null, action) =>
    [
      "ACTIVITIES_SCREEN/NEW_ACTIVITY_COMPLETE",
      "ACTIVITIES_SCREEN/ACTIVITY_DELETE",
      "CALENDAR_SCREEN/NEW_ACTIVITY_LOG",
      "CALENDAR_SCREEN/REMOVE_ACTIVITY_LOG"
    ].some(type => action.type === type)
      ? Date.now()
      : state
});

export default rootReducer;
