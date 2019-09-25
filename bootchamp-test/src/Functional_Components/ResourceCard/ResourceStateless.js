import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ResourceCard.css";

var moment = require("moment");

const ResourceStateless = ({ resource }) => {
  //const tags = useSelector(state => state.tags);
  const dispatch = useDispatch();
  const addSelectedTags = useCallback(
    tags => {
      dispatch({ type: "SELECT_TAGS", payload: tags });
    },
    [dispatch]
  );

  return (
    <div className="rsce">
      <div className="rsce-Container " key={resource.id}>
        <div className="rsce-Title ">
          <div>{resource.title}</div>
          <div className="rsce-CreatedBy">
            <Link
              to={"/Contributor/" + resource.createdBy.id}
              className="link-creator"
            >
              {resource.createdBy.name}
            </Link>
          </div>
        </div>
        <div className="rsce-Content">{resource.text}</div>

        <div className="rsce-Footer">
          <div className="rsce-Tags">
            {resource.tags.map(tag => {
              return (
                <Link
                  key={tag.id}
                  to={"/TagPage/"}
                  className="link-tag"
                  onClick={() => addSelectedTags(tag)}
                >
                  #{tag.label}
                </Link>
              );
            })}
          </div>
          <div className="rsce-City">
            <div className="rsce-citystate">
              {resource.city.name} , {resource.city.state}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceStateless;
