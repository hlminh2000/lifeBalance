import moment from "moment";

export default {
  getDateString: timestamp => new moment(timestamp || undefined).format(),
  toCalendarString: serializedDateStr =>
    new moment(serializedDateStr).format("YYYY-MM-DD"),
  now: () => Date.now(),
  currentCalendarString: () => new moment().format("YYYY-MM-DD")
};
