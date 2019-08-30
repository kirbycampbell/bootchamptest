import React, { useState, useEffect } from "react";
import "./Index.css";

const Index = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(["item1", "item2", "item3"]);
  }, []);

  return (
    <div>
      {posts.map(post => {
        return <div key={post}>{post}</div>;
      })}
    </div>
  );
};
export default Index;
