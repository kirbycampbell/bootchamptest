import React, { useState } from "react";
import "./App.css";
import NewUser from "./SignInUp/NewUser";
import TopNav from "./TopNav/TopNav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Topics from "./Topics/Topics";
import Cities from "./Cities/Cities";
import Resources from "./Resources/Resources";
import Profile from "./Profile/Profile";

const App = ({ Contributor }) => {
  const [createAccount, setCreateAccount] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  console.log("Redux State:");
  console.log(Contributor);
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
          <Route exact path="/Topics" render={() => <Topics />} />
          <Route exact path="/Cities" render={() => <Cities />} />
          <Route exact path="/Resources" render={() => <Resources />} />
          <Route exact path="/Profile" render={() => <Profile />} />
          {/*   <LoggedInUser /> */}
        </div>
      </div>
    </Router>
  );
};

export default App;
