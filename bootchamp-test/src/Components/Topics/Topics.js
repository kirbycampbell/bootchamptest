import React, { useState, useEffect } from "react";

import CreateTopic from "./CreateTopic";
//import TopicStateless from "../../Functional_Components/TopicCard/TopicStateless";
import { getAllTopics } from "../../API/topic_api";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getAllTopics().then(res => setTopics(res));
  }, []);
  console.table(topics);
  return (
    <React.Fragment>
      <CreateTopic />
    </React.Fragment>
  );
};

export default Topics;
