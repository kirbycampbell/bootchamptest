import React from "react";
import "./tile.styles.scss";

const Tile = ({ name, content }) => (
  <div className="tile-item">
    <div className="tile-footer">
      <span className="name">{name}</span>
      <span className="name">{content.text}</span>
    </div>
  </div>
);

export default Tile;
