import React, { useState } from "react";
import "./App.css";
import LoggedInUser from "./LoggedInUser";
import NewUser from "./SignInUp/NewUser";
import TopNav from "./TopNav/TopNav";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  const [createAccount, setCreateAccount] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  console.log("Outer App userInfo");
  console.log(userInfo);

  return (
    <Router>
      <div className="App">
        <TopNav userInfo={userInfo} />
        <div className="Main-Content">
          <Route
            exact
            path="/"
            render={() => (
              <NewUser
                createAccount={createAccount}
                setCreateAccount={setCreateAccount}
                setUserInfo={setUserInfo}
                userInfo={userInfo}
              />
            )}
          />
          {/* <LoggedInUser /> */}
          {/* <LoggedInUser />
          <LoggedInUser />
          <LoggedInUser />
          <LoggedInUser /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
