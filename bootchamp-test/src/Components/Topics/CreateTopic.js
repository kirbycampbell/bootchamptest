import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./CreateTopic.css";
import { URL } from "../../Variable_Constants/url";
import Cities from "../Cities/Cities";
import Tags from "../Tags/Tags";
import ImageForm from "../../Functional_Components/Forms/ImageUploadForms/ImageForm";
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

  // Check box state
  const [imgCheck, setImgCheck] = useState(false);
  const [cityCheck, setCityCheck] = useState(false);

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
    <div className="">
      <div className="is-ancestor ">
        <div className="tile is-parent is-vertical ">
          <article className=" is-child notification is-dark is-bordered border-card ">
            <div className="field">
              <label className="label has-text-white">Create New Topic</label>
              <div className="control">
                <input
                  className="input has-text-white"
                  type="text"
                  placeholder="Title"
                />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <textarea
                  class="textarea is-primary input has-text-white"
                  placeholder="Enter some Content..."
                ></textarea>
              </div>
            </div>
            <p className="container">
              <nav className="level is-mobile is-fluid">
                <div className="level-item  ">
                  {/* <div className="tags">
                    <span className="tag is-light">React</span>
                    <span className="tag is-light">Vue</span>
                  </div> */}
                  <Tags setTags={setTags} tags={tags} />
                </div>

                <div className="level-item has-text-centered">
                  <div>
                    <Cities
                      setCity={setCity}
                      city={city}
                      setCityCheck={setCityCheck}
                    />
                  </div>
                </div>
                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-primary">Submit</button>
                  </div>
                  <div class="control">
                    <button class="button is-text">Cancel</button>
                  </div>
                </div>
              </nav>
            </p>
          </article>
        </div>
      </div>
      {/* <div className="field">
        <label className="label has-text-white">Title</label>
        <div className="control">
          <input className="input" type="text" placeholder="Title" />
        </div>
      </div>
      <div class="field">
        <label class="label has-text-white">Message</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Textarea"
            placeholder="Add some Text to your topic..."
          ></textarea>
        </div>
      </div>
      <Tags setTags={setTags} tags={tags} /> */}
    </div>
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
  );
};

export default CreateTopic;
