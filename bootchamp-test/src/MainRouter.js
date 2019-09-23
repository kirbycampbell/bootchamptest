import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthUser from "./Components/AuthUser/AuthUser";
import TopNav from "./Components/TopNav/TopNav";
import Topics from "./Components/Topics/Topics";
import Resources from "./Components/Resources/Resources";
import Profile from "./Components/Profile/Profile";
import "./App.css";
import Index from "./Components/Index/Index";
import Contributor from "./Components/Contributor/Contributor";
import TagPage from "./Components/Tags/TagPage";

const MainRouter = () => {
  const auth = useSelector(state => state.auth);
  return (
    <Router>
      <div className="App">
        <TopNav />
        <div className="Main-Content">
          <Route exact path="/" render={() => <Index />} />
          <Route exact path="/LogIn" render={() => <AuthUser />} />
          <Route exact path="/Topics" render={() => <Topics />} />
          <Route exact path="/Resources" render={() => <Resources />} />
          {auth && <Route exact path="/Profile" render={() => <Profile />} />}
          <Route exact path="/TagPage" render={() => <TagPage />} />
          <Route
            path="/Contributor/:id"
            render={props => <Contributor {...props} />}
          />
        </div>
      </div>
    </Router>
  );
};

export default MainRouter;
