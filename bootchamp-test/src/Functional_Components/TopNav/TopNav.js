import React, {useState} from 'react';
import './TopNav.css';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import TopicCreateModal from '../Modals/TopicCreateModal';
import ResCreateModal from '../Modals/ResCreateModal';

const TopNav = () => {
  const auth = useSelector(state => state.UserStore.auth);
  const [topicModal, setTopicModal] = useState(false);
  const [resModal, setResModal] = useState(false);
  let modalProps = {topicModal, resModal, setTopicModal, setResModal};

  const NavBar = () => {
    return (
      <div className="Outer-TopNav">
        <div className="Nav-Left">
          <TopicCreateModal {...modalProps} />
          <ResCreateModal {...modalProps} />
          <Link to="/" className="Nav-Piece">
            Home
          </Link>

          <div onClick={() => setTopicModal(!topicModal)} className="Nav-Piece">
            Topics <i className="fas fa-plus-square lf-space"></i>
          </div>

          <div onClick={() => setResModal(!resModal)} className="Nav-Piece">
            Resources <i className="fas fa-plus-square lf-space"></i>
          </div>
        </div>
        <div className="Nav-Right">
          <Link to={auth ? '/Profile' : '/Login'} className="Nav-Piece">
            {auth && 'Profile'}
            {!auth && 'Login'}
          </Link>
        </div>
      </div>
    );
  };
  return <NavBar />;
};

export default TopNav;
