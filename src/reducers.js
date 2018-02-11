import { combineReducers } from "redux";
import activitiesScreenReducer from "./components/ActivitiesScreen/reducers.js";
import calendarScreenReducer from "./components/CalendarScreen/reducers.js";
import authReducer from "./components/AuthScreen/reducers.js";

const rootReducer = combineReducers({
  activitiesScreen: activitiesScreenReducer,
  calendarScreen: calendarScreenReducer,
  auth: authReducer
});

export default rootReducer;
