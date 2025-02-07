import { combineReducers } from "redux";
import Prompt from "./SnackBar/reducer";
import Loader from "./Loader/reducer";
import AuthReducer from "./Authentication/reducer";
import ProfileSettingsReducer from "Redux/ProfileSettings/reducer";
import SiteSettingsReducer from "./SiteSettings/reducer";
import sidebarReducer from "./Sidebar/reducer";
import timezoneReducer from "./TimeZone/reducer"

const rootReducer = combineReducers({
  snackbar: Prompt,
  Loader: Loader,
  AuthReducer: AuthReducer,
  ProfileSettingsReducer: ProfileSettingsReducer,
  SiteSettingsReducer: SiteSettingsReducer,
  sidebar: sidebarReducer,
  timezone: timezoneReducer,
});

export default rootReducer;
