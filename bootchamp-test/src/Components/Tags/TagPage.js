import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopicsByTag } from "../../API_Front/tag_api";
import TopicStateless from "../Topics/TopicStateless";

const TagPage = () => {
  const tags = useSelector(state => state.tagsSelected);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    //console.log(tags);
    getTopicsByTag(tags.id, tags.id).then(res => setTopics(res.data));
  }, [tags]);
  console.log(tags);
  return (
    <div>
      <div className="Topic-List">
        <h2>Topics matching {tags.label}</h2>
        {topics.map(topic => {
          return <TopicStateless topic={topic} key={topic.id} />;
        })}
      </div>
    </div>
  );
};

export default TagPage;
