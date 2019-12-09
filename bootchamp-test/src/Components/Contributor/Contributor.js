import React, { useState, useEffect } from 'react'
import './Contributor.css'
import TopicStateless from '../../Functional_Components/TopicCard/TopicStateless'
import {
  getContributor,
  getContributorTopics,
  getContributorResources
} from '../../API/contrib_apis' // move backend calls here - seperate by type
import ResourceStateless from '../../Functional_Components/ResourceCard/ResourceStateless'

const Contributor = props => {
  const [contributor, setContributor] = useState([])
  const [contTopics, setContTopics] = useState([])
  const [resourceList, setResourceList] = useState([])
  const slug = props.match.params.id

  useEffect(() => {
    getContributor(slug).then(res => setContributor(res.data))
    getContributorTopics(slug).then(res => setContTopics(res.data))
    getContributorResources(slug).then(res => setResourceList(res.data))
  }, [slug])

  return (
    <div>
      <div className="Profile-Title"> {contributor.name}'s Profile</div>
      <div className="pic-cont">
        <img className="pic" src={contributor.avatar} alt="ProfilePic" />
      </div>
      {contributor.cities && (
        <div className="profile-city">
          Location: {contributor.cities.name}, {contributor.cities.state}
        </div>
      )}

      <div className="Topic-List">
        <h2>Topics</h2>
        {contTopics.map(topic => {
          return <TopicStateless topic={topic} key={topic.id} />
        })}
      </div>
      {/* :::::::::: Resource AREA ::::::::::: */}
      <div className="Topic-List">
        <h2>Resources</h2>
        {resourceList.map(resource => {
          return <ResourceStateless resource={resource} key={resource.id} />
        })}
      </div>
    </div>
  )
}

export default Contributor
