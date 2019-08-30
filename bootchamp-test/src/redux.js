import { createStore } from "redux";

const initialState = {
  user: {},
  auth: false
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
    default:
      return state;
  }
}

export const loginUserAction = user => ({
  type: "LOGIN_USER",
  payload: user
});

export const logoutUserAction = user => ({
  type: "LOGOUT_USER"
});
