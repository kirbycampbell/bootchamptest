import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import './Resources.css';
import {URL} from './../../constants/url';
import Tags from '../Tags/Tags';
import Cities from '../Cities/Cities';
const axios = require('axios');
const uuidv1 = require('uuid/v1');

const Resources = () => {
  const user = useSelector(state => state.user);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [city, setCity] = useState([]);
  const [tags, setTags] = useState([]);
  const [resourceList, setResourceList] = useState([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    axios.get(URL + 'resources/').then(function(res) {
      setResourceList(res.data);
    });
    console.log('calling query');
  }, []);

  const resetForm = () => {
    setTitle('');
    setText('');
    setLink('');
    setCity([]);
    setTags([]);
  };

  const handleResourceForm = () => {
    console.log('button pressed');
    axios
      .post(URL + 'resources/', {
        id: uuidv1(),
        title: title,
        text: text,
        link: link,
        city: city,
        tags: tags,
        createdBy: {
          name: user.name,
          id: user.id,
        },
      })
      .then(function(res) {
        setMsg('Created New Resource');
        axios.get(URL + 'resources/').then(function(response) {
          setResourceList(response.data);
        });
        resetForm();
      })
      .catch(function(error) {
        setError(error);
      });
  };

  return (
    <div className="Outer-resource">
      <h1>Create Resource</h1>
      {/* :::::::::::: City Input Form ::::::::::::: */}
      <div className="resource-form">
        <input
          className="input-resource"
          type="text"
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
          value={title}
          name="title"
          autoComplete="off"
        />

        <Cities setCity={setCity} city={city} />

        <Tags setTags={setTags} tags={tags} />
        <textarea
          className="text-inp-box"
          type="textarea"
          placeholder="Text"
          onChange={e => setText(e.target.value)}
          value={text}
          autoComplete="off"
        />

        <div className="input-resourcesbm" onClick={handleResourceForm}>
          <i className="fas fa-check check"></i>
          Submit
        </div>
      </div>
      {/* :::::::::  Message  :::::::::: */}
      {error && <div className="resourceError">{error}</div>}
      {msg && <div className="resourcemsg">{msg}</div>}
      {/* List of all Resources that Exist in DB - TEMP FEATURE*/}
      <div className="resourceList">
        List of All Resources (Temporary Feature):
        <br />
        <br />
        {resourceList.map(r => {
          return (
            <div className="resource-render" key={r.id}>
              {r.title} <br /> Text: {r.text} <br />
              Link: {r.link} <br /> City: {r.city.name}, {r.city.state} <br />
              Tags:
              {r.tags.map(tag => (
                <span key={tag.id}>{tag.label} </span>
              ))}
              <br />
              Created By: {r.createdBy.name} - - {r.createdBy.id}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Resources;
