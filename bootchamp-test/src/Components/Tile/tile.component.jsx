import React from "react";
import "./tile.styles.scss";

const Tile = ({ name }) => (
  <div className="tile-item">
    <div className="tile-footer">
      <span className="name">{name}</span>
    </div>
  </div>
);

export default Tile;
