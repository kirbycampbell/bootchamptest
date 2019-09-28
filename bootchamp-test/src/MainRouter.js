import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthUser from "./Components/AuthUser/AuthUser";
import TopNav from "./Functional_Components/TopNav/TopNav";
import Topics from "./Components/Topics/Topics";
import Resources from "./Components/Resources/Resources";
import Profile from "./Components/Profile/Profile";
import "./App.css";
import Index from "./Functional_Components/Index/Index";
import Contributor from "./Components/Contributor/Contributor";
import TagPage from "./Components/Tags/TagPage";
import Home from "./Components/HomePage/Home";
import Footer from "./Functional_Components/Footer/Footer";

const MainRouter = () => {
  const auth = useSelector(state => state.UserStore.auth);
  return (
    <Router>
      <body className="hero is-dark column has-navbar-fixed-top">
        <section className="hero is-desktop ">
          <TopNav />
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/LogIn" render={() => <AuthUser />} />
          {auth && <Route exact path="/Profile" render={() => <Profile />} />}
          <Route exact path="/Resources" render={() => <Resources />} />
          <Route exact path="/Topics" render={() => <Topics />} />

          <Route exact path="/About" render={() => <Index />} />

          <Route exact path="/TagPage" render={() => <TagPage />} />
          <Route
            path="/Contributor/:id"
            render={props => <Contributor {...props} />}
          />

          <Footer />
        </section>
      </body>
    </Router>
  );
};

export default MainRouter;
