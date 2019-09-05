import React, { useState } from "react";
import "./Resources.css";

const Resources = () => {
  const [file, setFile] = useState(null);

  const fileSelectedHandler = event => {
    //set state to be this file
    console.log(event.target.files);

    setFile(URL.createObjectURL(event.target.files[0]));
  };

  // const fileUploadHandler = () => {};

  return (
    <div>
      <input type="file" onChange={fileSelectedHandler} />
      {/* <button onClick={fileUploadHandler}>Upload</button>  */}
      {console.log(file)}
      <img className="image" src={file} alt="file"></img>
    </div>
  );
};
export default Resources;
