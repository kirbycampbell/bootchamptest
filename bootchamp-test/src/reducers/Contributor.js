import { LOGIN_USER } from "../constants/ActionTypes";

const initialState = [{ user: null, auth: false }];

export default function Contributor(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return [{ user: action.user, auth: true }];
    default:
      return state;
  }
}
