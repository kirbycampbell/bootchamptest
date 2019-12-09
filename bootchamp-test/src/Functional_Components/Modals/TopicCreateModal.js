import React from 'react'
import CreateTopic from '../../Components/Topics/CreateTopic'

const TopicCreateModal = ({ topicModal, setTopicModal }) => {
  return (
    <div className={'modal ' + (topicModal ? 'is-active' : null)}>
      <div
        className="modal-background"
        onClick={() => setTopicModal(false)}
      ></div>
      <div className="modal-content has-text-centered">
        <CreateTopic />
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => setTopicModal(!topicModal)}
      ></button>
    </div>
  )
}

export default TopicCreateModal
