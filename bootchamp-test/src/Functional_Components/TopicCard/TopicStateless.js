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
    <div className="is-ancestor ">
      <div className="tile is-parent is-vertical is-fullwidth">
        <article className=" is-child notification is-dark is-bordered border-card ">
          <div className="CardCreatedAt">
            {moment(topic.createdAt).fromNow()}
          </div>
          <div className="title has-text-centered"> {topic.name}</div>
          <div className="tile is-ancestor">
            <nav className="tile is-parent ">
              <div className=" tile is-child ">
                {topic.content}
                {topic.images && (
                  <figure className="card-image is-48x48 max-pic">
                    <img
                      className="max-pic"
                      src={topic.images}
                      alt={topic.images}
                    />
                  </figure>
                )}
              </div>
            </nav>
          </div>
          <div className="container">
            <nav className="level is-mobile is-fluid">
              <div className="level-item  ">
                <div className="tags">
                  {topic.tags.map(tag => {
                    return (
                      <div className="tag" key={tag.id}>
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
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <div className="heading">Likes</div>
                  <div className="title">{topic.likedBy.length}</div>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <Link
                    to={"/Contributor/" + topic.createdBy.id}
                    className="custom-link"
                  >
                    {topic.createdBy.name}
                  </Link>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <div className="heading">
                    {topic.cities.name} , {topic.cities.state}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
  );
};

export default TopicStateless;

// <div className="container">
//   <div className="card">
//     <div className="card-header-title">
//       {topic.name}
//       <div className="CardCreatedBy">
//         <Link
//           to={"/Contributor/" + topic.createdBy.id}
//           className="custom-link"
//         >
//           {topic.createdBy.name}
//         </Link>
//       </div>
//       <div className="CardCreatedAt">
//         {moment(topic.createdAt).format("MM/DD/YYYY")}
//       </div>
//     </div>
//     <div className="card-content ">
//       {topic.content}

//       <figure className="card-image is-48x48 max-pic">
//         <img className="max-pic" src={topic.images} alt={topic.images} />
//       </figure>
//     </div>
//     <div className="CardTags">
//       {topic.tags.map(tag => {
//         return (
//           <div className="IndTag" key={tag.id}>
//             <Link
//               to={"/TagPage/"}
//               className="custom-link"
//               onClick={() => addSelectedTags(tag)}
//             >
//               {tag.label}
//             </Link>
//           </div>
//         );
//       })}
//     </div>
//     <div className="card-footer">
//       <div className="card-footer-item">Likes: {topic.likedBy.length}</div>
//       <div className="card-footer-item">
//         {topic.cities.name} - {topic.cities.state}
//       </div>
//     </div>
//   </div>
// </div>
