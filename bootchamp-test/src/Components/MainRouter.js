import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router";
import AuthUser from "./AuthUser/AuthUser";
import TopNav from "./TopNav/TopNav";
import Topics from "./Topics/Topics";
import Cities from "./Cities/Cities";
import Resources from "./Resources/Resources";
import Profile from "./Profile/Profile";
import "./App.css";

const MainRouter = props => {
  return (
    <Router>
      {!props.auth && <Redirect to="/Login" />}
      <div className="App">
        <TopNav {...props} />
        <div className="Main-Content">
          <Route exact path="/" render={() => <div>Homepage</div>} />
          <Route
            exact
            path="/LogIn"
            render={() =>
              !props.auth ? <AuthUser {...props} /> : <Redirect to="/Profile" />
            }
          />
          <Route exact path="/Topics" render={() => <Topics {...props} />} />
          <Route
            exact
            path="/Cities"
            render={() => <Cities user={props.user} auth={props.auth} />}
          />
          <Route
            exact
            path="/Resources"
            render={() => <Resources user={props.user} auth={props.auth} />}
          />
          <Route
            exact
            path="/Profile"
            render={() => <Profile user={props.user} auth={props.auth} />}
          />
        </div>
      </div>
    </Router>
  );
};

export default MainRouter;
