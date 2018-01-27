import { combineReducers } from "redux";
import activitiesScreenReducer from "./components/ActivitiesScreen/reducers.js";
import calendarScreenReducer from "./components/CalendarScreen/reducers.js";

const rootReducer = combineReducers({
  activitiesScreen: activitiesScreenReducer,
  calendarScreen: calendarScreenReducer
});

export default rootReducer;
