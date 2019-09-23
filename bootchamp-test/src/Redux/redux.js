import { createStore } from "redux";

const initialState = {
  user: {},
  auth: false,
  tagsSelected: []
};

export const store = createStore(reducer, initialState);

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_USER":
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
    case "SELECT_TAGS":
      let tagsSelected = state.tagsSelected;
      tagsSelected = action.payload;
      let newState = { ...state, tagsSelected };
      return newState;

    default:
      return state;
  }
}

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
