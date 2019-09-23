import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Topics.css";
var moment = require("moment");

const TopicStateless = ({ topic }) => {
  const dispatch = useDispatch();
  const addSelectedTags = useCallback(
    tags => {
      dispatch({ type: "SELECT_TAGS", payload: tags });
    },
    [dispatch]
  );
  return (
    <div className="topics">
      <div className="Topic-Container" key={topic.id}>
        <div className="TopTitle">
          {topic.name}
          <div className="TopCreatedBy">
            {" "}
            <Link
              to={"/Contributor/" + topic.createdBy.id}
              className="custom-link"
            >
              {topic.createdBy.name}
            </Link>
          </div>
          <div className="TopCreatedAt">
            {moment(topic.createdAt).format("MM/DD/YYYY")}
          </div>
        </div>
        <div className="TopContent">
          {topic.content}
          <div className="TopImg">
            <img src={topic.images} alt={topic.images} />
          </div>
        </div>
        <div className="TopTags">
          {topic.tags.map(tag => {
            return (
              <div className="IndTag" key={tag.id}>
                <Link
                  to={"/TagPage/"}
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
          <div className="TopLikes">Likes: {topic.likedBy.length}</div>
          <div className="TopCity">
            {topic.cities.name} - {topic.cities.state}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicStateless;
