export const loginUserAction = user => ({
  type: "LOGIN_USER",
  payload: user
});

export const logoutUserAction = user => ({
  type: "LOGOUT_USER"
});

export const addTagSelection = tags => ({
  type: "SELECT_TAGS",
  payload: tags
});
