/// REVISIT LATER ///////
/// DEPENDENT ON AN EXTERNAL API -CAUSING LOCALISSUES /////

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { FcUpload } from 'react-icons/fc';

export default function UploadAndDisplayImage({
  setImageUploadModal,
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
  const closeModal = (e) => {
    if (e.key === 'Escape' || e.type === 'Click') {
      document.querySelector('.write-review-modal').classList.add('exiting');
      setTimeout(() => {
        setImageUploadModal(false);
        document.querySelector('.write-review-modal').classList.remove('exiting');
      }, 200);
    }
    document.querySelector('.write-review-modal').classList.add('exiting');
    setTimeout(() => {
      setImageUploadModal(false);
      document.querySelector('.write-review-modal').classList.remove('exiting');
    }, 200);
  };

  const handleSubmit = (file) => {
    const rf = new FileReader();
    rf.readAsDataURL(file);
    rf.onloadend = function (event) {
      const body = new FormData();
      body.append('image', event.target.result.split(',').pop());
      imageURLGenerator(event.target.result.split(',').pop());
    };
  };

  return ReactDOM.createPortal((
    <div className="write-review-modal">
      <div className="write-review-modal-parent">
        <div className="write-review-modal-back">
          <button className="close-img-modal" type="button" onClick={(e) => closeModal(e)}>Back</button>
          {selectedImage.length < 5 && (
            <>
              <div
                className="drag-and-drop"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const { files } = e.dataTransfer;
                  // const files = e.dataTransfer.files;
                  if (files.length) {
                    setSelectedImage([...selectedImage, files[0]]);
                    handleSubmit(files[0]);
                  }
                }}
              >
                <p
                  className="drag-and-drop-text"
                >
                  Drag And Drop Or Click To Upload Your Image!
                  <FcUpload className="review-image-upload-icon" />
                  <input
                    className="xyz"
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                      setSelectedImage([...selectedImage, event.target.files[0]]);
                      handleSubmit(event.target.files[0]);
                    }}
                  />
                </p>
              </div>
              {/* <input
                className="review-image-main-upload-button"
                type="file"
                name="myImage"
                onChange={(event) => {
                  setSelectedImage([...selectedImage, event.target.files[0]]);
                  handleSubmit(event.target.files[0]);
                }}
              /> */}
            </>
          )}
        </div>
        <h1 className="write-review-thumbnail">Show us your look!</h1>
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
    </div>), document.getElementById('modal'));
}
