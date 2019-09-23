import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import '../Topics/Topics.css';

var moment = require('moment');

const ResourceStateless = ({topic}) => {
  //const tags = useSelector(state => state.tags);
  const dispatch = useDispatch();
  const addSelectedTags = useCallback(
    tags => {
      dispatch({type: 'SELECT_TAGS', payload: tags});
    },
    [dispatch]
  );
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
        <div className="TopContent">{topic.text}</div>
        <div className="TopTags">
          {topic.tags.map(tag => {
            return (
              <div className="IndTag" key={tag.id}>
                <Link
                  to={'/TagPage/'}
                  className="custom-link"
                  onClick={() => addSelectedTags(tag)}
                >
                  {tag.label}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="TopFooter">
          <div className="TopCity">
            {topic.city.name} - {topic.city.state}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceStateless;
