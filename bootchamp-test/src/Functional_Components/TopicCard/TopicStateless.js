import React, { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

var moment = require('moment')

const TopicStateless = ({ topic }) => {
  const [likes, increaseLikes] = useState(0)
  const [liked, setLiked] = useState(false)

  const dispatch = useDispatch()
  const addSelectedTags = useCallback(
    tags => {
      dispatch({ type: 'SELECT_TAGS', payload: tags })
    },
    [dispatch]
  )

  //  make a topicApi function that calls the topic like endpoint, and sends the user id in the body, and the topic id in the url

  const handleClick = () => (
    // event.preventDefault()

    // console.log('touched my heart')
    setLiked(!liked), increaseLikes(likes + 1), console.log({ liked })
  )

  return (
    <div className="is-ancestor ">
      <div className="tile is-parent is-vertical is-fullwidth">
        <article className=" is-child notification is-dark is-bordered border-card ">
          {/* /////////////////////TIME CREATED/////////////////////// */}
          <div className="CardCreatedAt">
            {moment(topic.createdAt).fromNow()}
          </div>

          <div className="title has-text-centered"> {topic.name}</div>

          {/* ////////////////////IMAGE AND CONTENT//////////////////// */}
          <div className="tile is-ancestor">
            <nav className="tile is-parent ">
              <div className=" tile is-child ">
                {topic.content}
                {topic.images && (
                  <figure className="card-image is-48x48 max-pic">
                    <img
                      className="max-pic"
                      src={topic.images}
                      alt={topic.images}
                    />
                  </figure>
                )}
              </div>
            </nav>
          </div>

          {/* /////////////////////////////TAGS///////////////////////// */}
          <div className="container">
            <nav className="level is-mobile is-fluid">
              <div className="level-item  ">
                <div className="tags">
                  {topic.tags.map(tag => {
                    return (
                      <div className="tag" key={tag.id}>
                        <Link
                          to={'/TagPage/'}
                          className="custom-link"
                          onClick={() => addSelectedTags(tag)}
                        >
                          {tag.label}
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* ///////////////////////LIKES/////////////////////// */}
              <div className="level-item has-text-centered">
                <div>
                  <div className="heading">
                    <p>This has been liked {likes} times</p>
                    <i class="far fa-heart" onClick={handleClick}></i>
                  </div>

                  <span className="title">
                    {/* {topic.likedBy.length} */}
                    {likes}
                  </span>
                </div>
              </div>

              {/* /////////////////CREATED BY////////////// */}
              <div className="level-item has-text-centered">
                <div>
                  <Link
                    to={'/Contributor/' + topic.createdBy.id}
                    className="custom-link"
                  >
                    {topic.createdBy.name}
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
  )
}

export default TopicStateless
