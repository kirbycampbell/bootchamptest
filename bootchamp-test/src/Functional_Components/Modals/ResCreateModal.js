import React from "react";
import ResourceCreate from "../../Components/Resources/ResourceCreate";

const ResCreateModal = ({ resModal, setResModal }) => {
  return (
    <div className={"modal " + (resModal ? "is-active" : null)}>
      <div
        className="modal-background"
        onClick={() => setResModal(false)}
      ></div>
      <div className="modal-content has-text-centered">
        <ResourceCreate />
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => setResModal(!resModal)}
      ></button>
    </div>
  );
};

export default ResCreateModal;
