import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
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
    <div className="card">
      <div className="Card-Container" key={topic.id}>
        <div className="CardTitle">
          {topic.name}
          <div className="CardCreatedBy">
            <Link
              to={"/Contributor/" + topic.createdBy.id}
              className="custom-link"
            >
              {topic.createdBy.name}
            </Link>
          </div>
          <div className="CardCreatedAt">
            {moment(topic.createdAt).format("MM/DD/YYYY")}
          </div>
        </div>
        <div className="CardContent">
          {topic.content}
          <div className="CardImg">
            <img src={topic.images} alt={topic.images} />
          </div>
        </div>
        <div className="CardTags">
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
        <div className="CardFooter">
          <div className="CardLikes">Likes: {topic.likedBy.length}</div>
          <div className="CardCity">
            {topic.cities.name} - {topic.cities.state}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicStateless;
