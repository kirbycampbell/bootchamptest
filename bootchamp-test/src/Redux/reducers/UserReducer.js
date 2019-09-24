const initUserState = {
  user: {},
  auth: false
};

export const UserStore = (state = initUserState, action) => {
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
