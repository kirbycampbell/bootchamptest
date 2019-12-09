import React, { useState, useEffect } from 'react'
import './Tags.css'
import {
  searchTagsByRegex,
  searchAllTags,
  createTagMutate
} from '../../API/tag_api'

// When calling this component, switch chosen tags to props
// method so that the array of objs can be sent.

const Tags = ({ tags, setTags }) => {
  const [typeTag, setTypeTag] = useState('')
  const [queryMatch, setQueryMatch] = useState([])

  useEffect(() => {
    if (typeTag.length > 2) {
      searchTagsByRegex(typeTag).then(res => setQueryMatch(res))
    } else {
      setQueryMatch([])
    }
  }, [typeTag])

  const handleForm = tag => {
    let newList = tags.filter(item => {
      return item.id !== tag.id
    })
    newList.push(tag)
    setTags(newList)
    setTypeTag('')
    setQueryMatch([])
  }

  const handleTyping = e => {
    setTypeTag(e.target.value)
  }

  const handleSelect = tag => {
    handleForm(tag)
  }

  const removeTag = tag => {
    let newList = tags.filter(item => {
      return item.id !== tag.id
    })
    setTags(newList)
  }

  const createTag = async () => {
    await searchAllTags(typeTag).then(res => {
      console.log(res)
      if (res) {
        handleForm(res)
      } else if (res.data) {
        createTagMutate(typeTag).then(function(res) {
          handleForm(res.data)
          console.log(res.data)
        })
      }
    })
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      createTag()
    } else if (event.key === ',') {
      createTag()
    }
  }

  return (
    <div className="">
      <div className="field">
        {/* <div className="input-card"> */}
        <div className="tags">
          {/* ::::::::::: Chosen Tags :::::::::::::: */}
          {tags.length > 0 &&
            tags.map(tag => {
              return (
                <span key={tag.id} className="tag  is-link">
                  {tag.label.charAt(0).toUpperCase() + tag.label.slice(1)}

                  <button
                    class="delete"
                    onClick={() => removeTag(tag)}
                  ></button>
                </span>
              )
            })}{' '}
        </div>
        <div className="field ">
          <div className="control has-icons-right ">
            {/* ::::::::::: Input Section :::::::::::::: */}
            <input
              className="input is-danger has-text-white"
              id="tagInput"
              type="text"
              name="tag"
              placeholder="Enter Tags..."
              onChange={handleTyping}
              onKeyPress={handleKeyPress}
              value={typeTag}
              autoComplete="off"
            />
            {/* ::::::::::: Create Check Button :::::::::::::: */}
            {typeTag.length > 2 && (
              <span class="icon  is-right  ">
                <i class="fas fa-check is-info pointer" onClick={createTag}></i>
              </span>
            )}
          </div>
        </div>
      </div>
      {/* ::::::::::: List of Search Matches :::::::::::::: */}

      <div className="field">
        {queryMatch.length > 0 && typeTag.length > 2 && (
          <div className="Tag-search-results">
            {queryMatch.map(tag => {
              return (
                <div
                  className="ind-result"
                  key={tag.id}
                  onClick={() => handleSelect(tag)}
                >
                  {tag.label.charAt(0).toUpperCase() + tag.label.slice(1)}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tags
