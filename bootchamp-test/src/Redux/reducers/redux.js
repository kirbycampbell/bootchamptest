import { combineReducers } from "redux";

const initUserState = {
  user: {},
  auth: false
};
const initTagState = {
  selected: []
};

const UserStore = (state = initUserState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      console.log("logging in user!");
      localStorage.setItem("User", JSON.stringify(action.payload));
      return {
        user: action.payload,
        auth: true
      };
    case "LOGOUT_USER":
      localStorage.removeItem("User");
      return {
        user: {},
        auth: false
      };

    default:
      return state;
  }
};
const Tags = (state = initTagState, action) => {
  switch (action.type) {
    case "SELECT_TAGS":
      let tagsSelected = state.tagsSelected;
      tagsSelected = action.payload;
      let newState = { ...state, tagsSelected };
      return newState;

    default:
      return state;
  }
};

export default combineReducers({
  UserStore,
  Tags
});

export const loginUserAction = user => ({
  type: "LOGIN_USER",
  payload: user
});

export const addTagSelection = tags => ({
  type: "SELECT_TAGS",
  payload: tags
});

export const logoutUserAction = user => ({
  type: "LOGOUT_USER"
});
