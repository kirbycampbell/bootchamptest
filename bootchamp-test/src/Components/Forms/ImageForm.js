import React, {useState} from 'react';
import './ImageForm.css';

const ImageForm = ({setImgLink, setImgCheck}) => {
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
            className="input-resource"
            type="text"
            placeholder="Image Link"
            onChange={e => setImgLink(e.target.value)}
          />
        </div>

        <div className="input-citysbm" onClick={() => setImgCheck(false)}>
          <i className="fas fa-check check"></i>
          Cancel
        </div>
      </div>
    );
  } else if (uploadImg) {
    return (
      <div className="Outer-ImgForm">
        <div className="Inner-ImgForm">
          <input
            className="input-resource"
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
