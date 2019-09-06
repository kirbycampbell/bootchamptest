import React, {useState} from "react";
import "./Topics.scss";
import Tile from '../Tile/tile.component'
import { URL } from '../../constants/url'

const axios = require('axios')


const Topics = ({ id, name, content, tags}) => {

  axios
    .get(URL + 'topics/')
    .then(function (response) {
      let topics = response.data
      console.log(topics)
    })

  return (

  <div className='topics'>
    {console.log(topics)}
    <Tile />
  </div>
  )

};

export default Topics;
