import DateUtil from "../../utils/DateUtils";
import actions from "./actions";
import moment from "moment";
import DateUtils from "../../utils/DateUtils";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions["TEST"].type:
      return {
        ...state
      };
    default:
      return state;
  }
};
