import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import AuthUser from './Components/AuthUser/AuthUser';
import TopNav from './Functional_Components/TopNav/TopNav';

import Profile from './Components/Profile/Profile';
import './App.css';
import Index from './Functional_Components/Index/Index';
import Contributor from './Components/Contributor/Contributor';
import TagPage from './Components/Tags/TagPage';
import Home from './Components/HomePage/Home';
import Footer from './Functional_Components/Footer/Footer';
import LeftSortBar from './Functional_Components/LeftSortBar/LeftSortBar';
import RightFilterBox from './Functional_Components/RightFilterBox/RightFilterBox';

const MainRouter = () => {
  const auth = useSelector(state => state.UserStore.auth);

  return (
    <Router>
      <div className="Main-Div">
        <TopNav />

        <div className="Center-Section">
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/About" render={() => <Index />} />
          <Route exact path="/TagPage" render={() => <TagPage />} />
        </div>

        {auth && <Route exact path="/Profile" render={() => <Profile />} />}
        <Route exact path="/LogIn" render={() => <AuthUser />} />
        <Route
          exact
          path="/Contributor/:id"
          render={props => <Contributor {...props} />}
        />
      </div>
      <Footer />
    </Router>
  );
};

export default MainRouter;
