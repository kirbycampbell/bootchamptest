import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getTopicsByTag } from "../../API/tag_api";
import TopicStateless from "../../Functional_Components/TopicCard/TopicStateless";

const TagPage = () => {
  const tags = useSelector(state => state.Tags.selected);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    //console.log(tags);
    getTopicsByTag(tags.id).then(res => setTopics(res.data));
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
