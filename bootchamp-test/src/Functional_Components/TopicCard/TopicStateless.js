import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./TopicCard.css";
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
      <div className="tile is-parent is-vertical ">
        <article className=" is-child notification is-dark is-bordered border-card ">
          <div className="CardCreatedAt">
            {moment(topic.createdAt).fromNow()}
          </div>
          <div className="title has-text-centered"> {topic.name}</div>
          <p className="tile is-ancestor">
            <nav className="tile is-parent ">
              <div className="is-child ">
                incididunt ut labore et dolore magna aliqua. Libero volutpat sed
                cras ornare arcu dui. Sit amet justo donec enim diam vulputate
                ut. Convallis a cras semper auctor neque vitae tempus. Elit at
                imperdi t sed cras ornare arcu dui. Sit amet justo donec enim
                diam vulputate ut. Convallis a cras semper auctor neque vitae
                tempus. Elit at imperdi
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
          </p>
          <p className="container">
            <nav className="level is-mobile is-fluid">
              <div className="level-item  ">
                <div className="tags">
                  <span className="tag is-light">React</span>
                  <span className="tag is-light">Vue</span>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Likes</p>
                  <p className="title">{topic.likedBy.length}</p>
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
                  <p className="heading">
                    {topic.cities.name} , {topic.cities.state}
                  </p>
                </div>
              </div>
            </nav>
          </p>
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
