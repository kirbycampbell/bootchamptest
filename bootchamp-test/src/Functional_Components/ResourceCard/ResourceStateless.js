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
    <div className="card ">
      <div className="Card-Container rs-crd" key={resource.id}>
        <div className="CardTitle rs-title">
          <div>{resource.title}</div>
          <div className="CardCreatedBy">
            {" "}
            <Link
              to={"/Contributor/" + resource.createdBy.id}
              className="custom-link"
            >
              {resource.createdBy.name}
            </Link>
          </div>
          <div className="CardCreatedAt">
            {moment(resource.createdAt).format("MM/DD/YYYY")}
          </div>
        </div>
        <div className="CardContent">{resource.text}</div>
        <div className="CardTags">
          {resource.tags.map(tag => {
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
          <div className="CardCity">
            {resource.city.name} - {resource.city.state}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceStateless;
