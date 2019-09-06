import React, { useState, useEffect } from "react";
import "./Topics.scss";
import Tile from '../Tile/tile.component'
import { URL } from '../../constants/url'

const axios = require('axios')


const Topics = ({ id, name, content, tags}) => {


  const [topics, setTopics] = useState([])

  useEffect(() => {
    axios
    .get(URL + 'topics/')
    .then(function (response) {
      
      setTopics(response.data)
    })
    .catch(function(error) {
      console.log(error)
    })
  })
  

  return (

  <div className='topics'>
    {/* {console.log(topics)} */}
    {topics.map((topic) => {
      return <Tile name={topic.name}/>
    })}
    
  </div>
  )

};

export default Topics;
