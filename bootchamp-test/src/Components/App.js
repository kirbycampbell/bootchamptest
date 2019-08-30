import MainRouter from "./MainRouter";
import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const loginUser = useCallback(
    user => dispatch({ type: "LOGIN_USER", payload: user }),
    [dispatch]
  );

  useEffect(() => {
    if (!auth && localStorage.getItem("User")) {
      let userObj = JSON.parse(localStorage.getItem("User"));
      loginUser(userObj);
    }
  }, []);
  return (
    <div>
      <MainRouter user={user} auth={auth} />
    </div>
  );
};

export default App;
