import DateUtil from "../../utils/DateUtils";
import actions from "./actions";
import moment from "moment";
import DateUtils from "../../utils/DateUtils";

const initialState = {
  currentUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions["AUTH/LOGIN_COMPLETE"].type:
      return {
        ...state,
        currentUser: action.payload.user
      };
    default:
      return state;
  }
};
