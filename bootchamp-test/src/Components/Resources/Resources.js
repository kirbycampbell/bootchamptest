import React, {useState} from "react";
import "./Resources.css";


import axios from 'axios'

const Resources = () => {

  const [file, setFile] = useState(null)
 

  const fileSelectedHandler = (event) => {
    
    //set state to be this file
    console.log(event.target.files)
  
    setFile(URL.createObjectURL(event.target.files[0]))

  }

  const fileUploadHandler = () => {

  }


  

  return (

  <div>

    <input type='file' onChange={fileSelectedHandler}/>
    {/* <button onClick={fileUploadHandler}>Upload</button>  */}
      {console.log(file)}
    <img className='image'src={file}></img>

  </div>
  )
};
export default Resources;
