import React from "react";

const Contributor = ({ contributor: { name, joinedDate, id, createdAt } }) => {
  return (
    <React.Fragment>
      <h2>{name}</h2>
      <h3>{joinedDate}</h3>
      <h4>{id}</h4>
      <h5>Joined on: {createdAt}</h5>
    </React.Fragment>
  );
};

export default Contributor;
