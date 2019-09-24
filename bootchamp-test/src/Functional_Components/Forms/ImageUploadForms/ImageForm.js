import React, { useState } from "react";
import "./ImageForm.css";

const ImageForm = ({ setImgLink, setImgCheck }) => {
  const [imgURL, setImgURL] = useState("");
  const [imgQuestion, setImgQuestion] = useState(true);
  const [uploadImg, setUploadImg] = useState(false);
  const [linkImg, setLinkImg] = useState(false);

  const handleUpload = () => {
    setImgQuestion(false);
    setUploadImg(true);
  };
  const handleLinkImg = () => {
    setImgQuestion(false);
    setLinkImg(true);
  };

  const handleForm = () => {
    setImgLink(imgURL); // sets image in parent component - make sure parent feeds this
  };

  if (imgQuestion) {
    return (
      <div className="Outer-ImgForm">
        <div className="imgChoice" onClick={handleUpload}>
          Upload Image
        </div>
        <div className="imgChoice" onClick={handleLinkImg}>
          Link To Image
        </div>
      </div>
    );
  } else if (linkImg) {
    return (
      <div className="Outer-ImgForm">
        <div className="Inner-ImgForm">
          <input
            className="input-txt"
            type="text"
            placeholder="Image Link"
            onChange={e => setImgURL(e.target.value)}
            value={imgURL}
          />
        </div>
        {imgURL.length === 0 && setImgCheck ? (
          <div className="input-citysbm" onClick={() => setImgCheck(false)}>
            <i className="fas fa-check check"></i>
            Cancel
          </div>
        ) : (
          <div className="input-citysbm" onClick={handleForm}>
            <i className="fas fa-check check"></i>
            Add
          </div>
        )}
      </div>
    );
  } else if (uploadImg) {
    // Unfinished - needs to become it's own reuseable component for uploading images
    return (
      <div className="Outer-ImgForm">
        <div className="Inner-ImgForm">
          <input
            className="input-txt"
            type="file"
            placeholder="Upload Image"
            onChange={e => setImgLink(e.target.value)}
          />
        </div>

        <div className="input-citysbm" onClick={() => setImgCheck(false)}>
          <i className="fas fa-check check"></i>
          Cancel
        </div>
      </div>
    );
  } else return null;
};

export default ImageForm;
