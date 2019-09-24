import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Resources.css";
import Tags from "../Tags/Tags";
import Cities from "../Cities/Cities";
import { createResourceMutate, getResources } from "../../API/resource_api";

const Resources = () => {
  const user = useSelector(state => state.UserStore.user);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [city, setCity] = useState([]);
  const [tags, setTags] = useState([]);
  const [resourceList, setResourceList] = useState([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getResources().then(function(res) {
      setResourceList(res.data);
    });
  }, []);

  const resetForm = () => {
    setTitle("");
    setText("");
    setLink("");
    setCity([]);
    setTags([]);
  };

  const handleResourceForm = () => {
    let data = {
      title: title,
      text: text,
      link: link,
      city: city,
      tags: tags,
      createdBy: {
        name: user.name,
        id: user.id
      }
    };
    createResourceMutate(data)
      .then(function(res) {
        setMsg("Created New Resource");
        getResources().then(function(res) {
          setResourceList(res.data);
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
          className="input-txt"
          type="text"
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
          value={title}
          name="title"
          autoComplete="off"
          maxLength="60"
        />

        <Cities setCity={setCity} city={city} />

        <Tags setTags={setTags} tags={tags} />
        <textarea
          className="text-inp-box"
          type="textarea"
          placeholder="Something to Say? ..."
          onChange={e => setText(e.target.value)}
          value={text}
          autoComplete="off"
          maxLength="260"
        />

        <div className="input-txt-sbm" onClick={handleResourceForm}>
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
