import { combineReducers } from "redux";
import { Tags } from "./TagReducer";
import { UserStore } from "./UserReducer";

export default combineReducers({
  UserStore,
  Tags
});
