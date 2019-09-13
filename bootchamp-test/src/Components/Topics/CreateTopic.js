import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./CreateTopic.css";
import { URL } from "./../../constants/url";
const uuidv1 = require("uuid/v1");
const axios = require("axios");

const CreateTopic = () => {
  const user = useSelector(state => state.user);
  const [topicForm, setTopicForm] = useState({
    name: "",
    content: {},
    cities: [],
    tags: []
  });
  const createTopic = event => {
    event.preventDefault();
    setTopicForm({
      name: event.target.name.value,
      content: {
        images: event.target.images.value,
        code: event.target.code.value,
        text: event.target.text.value
      },

      cities: [event.target.cities.value],
      tags: [event.target.tags.value]
    });
  };

  useEffect(() => {
    if (topicForm.name !== "") {
      const topicMutation = async () => {
        axios
          .post(URL + "topics/", {
            id: uuidv1(),
            name: topicForm.name,
            content: topicForm.content,
            cities: topicForm.cities,
            tags: topicForm.tags,
            createdBy: user.id
          })
          .then(function(response) {
            console.log("success");
            console.log(response);
          })
          .catch(function(error) {
            console.log("error");
            console.log(error);
          });
      };
      topicMutation();
    }
  }, [topicForm]);

  return (
    <div className="OuterTopicForm">
      <h2>Create Topic Form</h2>
      <form className="topic-form" onSubmit={createTopic}>
        <input
          className="form-item"
          type="text"
          placeholder="Title"
          name="name"
        />
        <input
          className="form-item"
          type="text"
          placeholder="Link"
          name="link"
        />
        <input
          className="form-item"
          type="text"
          placeholder="Image Link"
          name="images"
        />
        <input
          className="form-item"
          type="text"
          placeholder="Code"
          name="code"
        />
        <input
          className="form-item"
          type="text"
          placeholder="City"
          name="cities"
        />
        <input
          className="form-item"
          type="text"
          placeholder="Tags"
          name="tags"
        />
        <textarea
          className="form-item-ta"
          type="text"
          placeholder="Text"
          name="text"
        />
        <input className="submit-btn" type="submit" placeholder="Post Topic" />
      </form>
    </div>
  );
};

export default CreateTopic;
