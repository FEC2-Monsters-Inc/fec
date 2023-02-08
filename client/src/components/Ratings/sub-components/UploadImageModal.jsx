/// REVISIT LATER ///////
/// DEPENDENT ON AN EXTERNAL API -CAUSING LOCALISSUES /////

import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineCloudUpload } from 'react-icons/ai';

export default function UploadAndDisplayImage({
  selectedImage,
  setSelectedImage,
  newReview,
  setNewReview,
  imgProgress,
  setImgProgress,
}) {
  // STATE DATA //
  const [numUploaded, setNumUploaded] = useState(0);

  // HELPER FUNCTIONS //
  const imageURLGenerator = (imgPath) => {
    const options = {
      url: 'http://localhost:3000/api/image',
      method: 'post',
      data: { imgPath },
    };
    axios(options)
      .then(({ data }) => setNewReview({
        ...newReview,
        photos: [...newReview.photos, data],
      }))
      .catch((err) => console.error(err));
  };

  const hideProgressBar = () => {
    setImgProgress({ ...imgProgress, [numUploaded]: true });
    setNumUploaded(numUploaded + 1);
  };
  const asyncHideProgressBar = () => {
    setTimeout(() => {
      hideProgressBar();
    }, 5000);
  };

  // EVENT HANDLERS //

  const handleSubmit = (file) => {
    if (file) {
      const rf = new FileReader();
      rf.readAsDataURL(file);
      rf.onloadend = function (event) {
        const body = new FormData();
        body.append('image', event.target.result.split(',').pop());
        imageURLGenerator(event.target.result.split(',').pop());
      };
    }
  };

  return (
    <div>
      <div>
        <div>
          {selectedImage.length < 5 && (
            <div
              className="drag-and-drop"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const { files } = e.dataTransfer;
                if (files.length) {
                  setSelectedImage([...selectedImage, files[0]]);
                  handleSubmit(files[0]);
                }
              }}
            >
              <div
                className="drag-and-drop-text"
              >
                <AiOutlineCloudUpload className="review-image-upload-icon" />
                <div>Drag And Drop Files</div>
                <div>or</div>
                <button type="button" className="review-image-upload-button">Click To Upload Your Image!</button>
                <input
                  className="xyz"
                  type="file"
                  name="myImage"
                  onChange={(event) => {
                    if (event.target.files[0]) {
                      setSelectedImage([...selectedImage, event.target.files[0]]);
                      handleSubmit(event.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <h1 className="write-review-thumbnail" />
        {selectedImage
          ? selectedImage.map(
            (image, index) => (
              <div key={image} className="write-review-thumbnail">
                <img alt="Thumbnail You Uploaded" width="250px" src={URL.createObjectURL(image)} />
                <br />
                <button
                  className="set-selected-img"
                  type="button"
                  onClick={() => {
                    setSelectedImage(selectedImage.filter((_, i) => i !== index));
                    setImgProgress({ ...imgProgress, [index]: false });
                  }}
                >
                  Remove
                </button>
                {imgProgress[index] === false ? (
                  <div className="upload-image-progress-bar">
                    {asyncHideProgressBar()}
                    <div className="upload-image-progress-bar-value" />
                  </div>
                )
                  : null}
              </div>
            ),
          )
          : null}
        <br />
        <br />
      </div>
    </div>
  );
}
