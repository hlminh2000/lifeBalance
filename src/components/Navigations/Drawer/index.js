import ActivitiesScreen from "../../ActivitiesScreen/index.js";
import CalendarScreen from "../../CalendarScreen/index.js";
import { DrawerNavigator } from "react-navigation";

const RootDrawer = DrawerNavigator({
  Calendar: {
    drawerLabel: "My Calendar",
    screen: CalendarScreen
  },
  ActivitiesScreen: {
    drawerLabel: "My Activities",
    screen: ActivitiesScreen
  }
});

export default RootDrawer;
