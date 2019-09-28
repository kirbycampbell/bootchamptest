import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Tags from "../Tags/Tags";
import Cities from "../Cities/Cities";
import { createResourceMutate, getResources } from "../../API/resource_api";
import CityResource from "../Cities/CityResource";

const ResourceCreate = () => {
  const user = useSelector(state => state.UserStore.user);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [city, setCity] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  console.log(user);
  useEffect(() => {
    getResources().then(function(res) {
      console.table(res.data);
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
          console.table(res.data);
        });
        resetForm();
      })
      .catch(function(error) {
        setError(error);
      });
  };

  return (
    <div>
      <div className="is-ancestor ">
        <div className="tile is-parent is-vertical ">
          <article className=" is-child notification is-dark is-bordered border-card ">
            <div className="field">
              <label className="label has-text-white has-text-centered">
                Create New Resource
              </label>
              <div className="control">
                <input
                  className="input is-large has-text-white"
                  type="text"
                  placeholder="Title"
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                  name="title"
                  autoComplete="off"
                  maxLength="60"
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <textarea
                  className="textarea is-primary input has-text-white"
                  placeholder="Add Resource Text..."
                  onChange={e => setText(e.target.value)}
                  value={text}
                  autoComplete="off"
                  maxLength="260"
                />
              </div>
            </div>
            <div className="columns is-vcentered ">
              <div className="column is-three-fifths ">
                <Tags setTags={setTags} tags={tags} />
              </div>

              <div className="column is-one-fifth ">
                {user.cities && (
                  <CityResource
                    setCity={setCity}
                    city={city}
                    cities={user.cities}
                  />
                )}
              </div>
              <div className="column is-one-fifth">
                <button
                  className="button is-success has-text-dark is-fullwidth"
                  onClick={handleResourceForm}
                >
                  Post
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
      {error && <div className="resourceError">{error}</div>}
      {msg && <div className="resourcemsg">{msg}</div>}
    </div>
  );
};
export default ResourceCreate;
