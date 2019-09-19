import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AuthUser from './AuthUser/AuthUser';
import TopNav from './TopNav/TopNav';
import Topics from './Topics/Topics';
import Resources from './Resources/Resources';
import Profile from './Profile/Profile';
import './App.css';
import Index from './Index/Index';
// import Test from "./P5test/p5.container";
import Tags from './Tags/Tags';

const MainRouter = props => {
  return (
    <Router>
      <div className="App">
        <TopNav {...props} />
        <div className="Main-Content">
          <Route exact path="/" render={() => <Index />} />
          <Route exact path="/LogIn" render={() => <AuthUser {...props} />} />
          <Route exact path="/Topics" render={() => <Topics {...props} />} />
          <Route
            exact
            path="/Cities"
            render={() => <div>To Play with Cities go to Resources</div>}
          />
          <Route
            exact
            path="/Resources"
            render={() => <Resources user={props.user} auth={props.auth} />}
          />
          {props.auth && (
            <Route
              exact
              path="/Profile"
              render={() => <Profile user={props.user} auth={props.auth} />}
            />
          )}

          <Route
            exact
            path="/Tags"
            render={() => <Tags user={props.user} auth={props.auth} />}
          />
        </div>
      </div>
    </Router>
  );
};

export default MainRouter;
