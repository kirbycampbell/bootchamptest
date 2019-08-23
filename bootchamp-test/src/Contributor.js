import React, { useState } from "react";

const Contributor = props => {
  return (
    <React.Fragment>
      <h2>{props.contributor.name}</h2>
      <h3>{props.contributor.joinedDate}</h3>
      <h4>{props.contributor.id}</h4>
    </React.Fragment>
  );
};

export default Contributor;
