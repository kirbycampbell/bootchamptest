import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import './CreateTopic.css';
import {URL} from './../../constants/url';
import Cities from '../Cities/Cities';
import Tags from '../Tags/Tags';
const uuidv1 = require('uuid/v1');
const axios = require('axios');

const CreateTopic = () => {
  const user = useSelector(state => state.user);
  const [topicForm, setTopicForm] = useState({
    name: '',
    content: {},
    cities: [],
    tags: [],
  });
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [city, setCity] = useState([]);
  const [tags, setTags] = useState([]);

  const resetForm = () => {
    setName('');
    setText('');
    setLink('');
    setCity([]);
    setTags([]);
  };

  const createTopic = event => {
    if (topicForm.name !== '') {
      axios
        .post(URL + 'topics/', {
          id: uuidv1(),
          name: name,
          content: topicForm.content,
          cities: city,
          tags: tags,
          createdBy: user.id,
        })
        .then(function(response) {
          console.log('success');
          console.log(response);
          resetForm();
        })
        .catch(function(error) {
          console.log('error');
          console.log(error);
        });
    }
  };

  return (
    <div className="OuterTopicForm">
      <h2>Create Topic Form</h2>
      <form className="topic-form" onSubmit={createTopic}>
        <input
          className="input-resource"
          type="text"
          placeholder="Title"
          onChange={e => setName(e.target.value)}
          value={name}
          autoComplete="off"
          maxLength="60"
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

        <textarea
          className="text-inp-box"
          type="textarea"
          placeholder="Add some Text to your topic..."
          onChange={e => setText(e.target.value)}
          value={text}
          autoComplete="off"
          maxLength="260"
        />
        <Cities setCity={setCity} city={city} />

        <Tags setTags={setTags} tags={tags} />

        <input
          className="submit-btn"
          placeholder="Post Topic"
          onClick={createTopic}
          type="submit"
        />
      </form>
    </div>
  );
};

export default CreateTopic;
