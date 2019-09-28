import React from "react";
import Resources from "../../Components/Resources/Resources";

const ResCreateModal = ({ resModal, setResModal }) => {
  return (
    <div className={"modal " + (resModal ? "is-active" : null)}>
      <div
        className="modal-background"
        onClick={() => setResModal(false)}
      ></div>
      <div className="modal-content has-text-centered">
        <Resources />
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
