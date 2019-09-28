import React, { useState } from "react";
import { useSelector } from "react-redux";
import { URL } from "../../Variable_Constants/url";
import Tags from "../Tags/Tags";
import ImageLinkUp from "../../Functional_Components/Forms/ImageLinkUp";
const uuidv1 = require("uuid/v1");
const axios = require("axios");

const CreateTopic = () => {
  // logged in User state
  const user = useSelector(state => state.UserStore.user);

  // Form state
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [city, setCity] = useState([]);
  const [tags, setTags] = useState([]);

  const resetForm = () => {
    setName("");
    setContent("");
    setCity([]);
    setTags([]);
    setImgLink("");
  };

  const createTopic = () => {
    if (name !== "") {
      axios
        .post(URL + "topics/", {
          id: uuidv1(),
          name: name,
          content: content,
          images: imgLink,
          cities: { id: city.id, name: city.name, state: city.state },
          tags: tags,
          createdBy: { id: user.id, name: user.name }
        })
        .then(function(response) {
          console.log("success");
          console.log(response);
          resetForm();
        })
        .catch(function(error) {
          console.log("error");
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="is-ancestor ">
        <div className="tile is-parent is-vertical ">
          <article className=" is-child notification is-dark is-bordered border-card ">
            <div className="field">
              <label className="label has-text-white has-text-centered">
                Create New Topic
              </label>
              <div className="control">
                <input
                  className="input is-large has-text-white"
                  type="text"
                  placeholder="Title"
                  onChange={e => setName(e.target.value)}
                  value={name}
                  autoComplete="off"
                  maxLength="60"
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <textarea
                  className="textarea is-primary input has-text-white"
                  placeholder="Enter some Content..."
                  onChange={e => setContent(e.target.value)}
                  value={content}
                  autoComplete="off"
                  maxLength="260"
                />
              </div>
            </div>
            <div className="columns is-vcentered ">
              <div className="column is-two-fifths ">
                <Tags setTags={setTags} tags={tags} />
              </div>

              <div className="column is-two-fifths ">
                <ImageLinkUp setImgLink={setImgLink} />
              </div>
              <div className="column is-one-fifth">
                <button
                  className="button is-success has-text-dark is-fullwidth"
                  onClick={createTopic}
                >
                  Post Topic
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default CreateTopic;

// <div className="OuterTopicForm">
//   <h2>Create Topic Form</h2>
//   <div className="topic-form" onSubmit={createTopic}>
//     <input
//       className="input-txt"
//       type="text"
//       placeholder="Title"
//       onChange={e => setName(e.target.value)}
//       value={name}
//       autoComplete="off"
//       maxLength="60"
//     />

//     <textarea
//       className="text-inp-box"
//       type="textarea"
//       placeholder="Add some Text to your topic..."
//       onChange={e => setContent(e.target.value)}
//       value={content}
//       autoComplete="off"
//       maxLength="260"
//     />
//     <Tags setTags={setTags} tags={tags} />
//     {cityCheck && (
//       <React.Fragment>
//         <Cities setCity={setCity} city={city} setCityCheck={setCityCheck} />
//       </React.Fragment>
//     )}
//     {imgCheck && (
//       <ImageForm setImgLink={setImgLink} setImgCheck={setImgCheck} />
//     )}
//     <div className="CheckSection">
//       <div className="check-btn">
//         <i
//           className="fas fa-city imgBox"
//           onClick={() => setCityCheck(!cityCheck)}
//         >
//           <span className="tooltiptext">Add City</span>
//         </i>
//       </div>

//       <div className="check-btn">
//         <i
//           className="far fa-images imgBox"
//           onClick={() => setImgCheck(!imgCheck)}
//         >
//           <span className="tooltiptext">Add Image</span>
//         </i>
//       </div>
//     </div>

//     <input
//       className="button is-primary is-large"
//       placeholder="Post Topic"
//       onClick={createTopic}
//       type="submit"
//     />
//   </div>
// </div>
