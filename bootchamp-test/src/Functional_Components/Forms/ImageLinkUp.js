import React, { useState } from "react";

const ImageLinkUp = ({ setImgLink }) => {
  const [imgURL, setImgURL] = useState("");
  return (
    <div className="columns is-mobile is-vcentered ">
      <div className="control column is-three-quarters">
        <input
          className="input has-text-white"
          type="text"
          placeholder="Paste Img Src..."
          onChange={e => setImgURL(e.target.value)}
        />
      </div>
      {imgURL.length > 0 && (
        <div className="column is-one-quarter">
          <button
            className="button  is-small"
            onClick={() => setImgLink(imgURL)}
          >
            Add Img
          </button>
        </div>
      )}
      {imgURL.length === 0 && (
        <div className=" column is-one-quarter  ">
          <div class="field">
            <div class="file is-small">
              <label class="file-label">
                <input class="file-input" type="file" name="resume" />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">Img</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageLinkUp;
