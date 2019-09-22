import React from 'react';
import {Link} from 'react-router-dom';
import '../Topics/Topics.css';

var moment = require('moment');

const ResourceStateless = ({topic}) => {
  return (
    <div className="topics">
      <div className="Topic-Container" key={topic.id}>
        <div className="TopTitle">
          {topic.title}
          <div className="TopCreatedBy">
            {' '}
            <Link
              to={'/Contributor/' + topic.createdBy.id}
              className="custom-link"
            >
              {topic.createdBy.name}
            </Link>
          </div>
          <div className="TopCreatedAt">
            {moment(topic.createdAt).format('MM/DD/YYYY')}
          </div>
        </div>
        <div className="TopContent">
          {topic.text}
          {/* <div className="TopImg">
            <img src={topic.images} alt={topic.images} />
          </div> */}
        </div>
        <div className="TopTags">
          {topic.tags.map(tag => {
            return (
              <div className="IndTag" key={tag.id}>
                {tag.label}
              </div>
            );
          })}
        </div>
        <div className="TopFooter">
          {/* <div className="TopLikes">Likes: {topic.likedBy.length}</div> */}
          <div className="TopCity">
            {topic.city.name} - {topic.city.state}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceStateless;
