import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default function UploadAndDisplayImage({
  setImageUploadModal,
  selectedImage,
  setSelectedImage,
  submitReview,
  setSubmitReview,
}) {
  const [progress, setProgress] = useState(0);
  const [progressBool, setProgressBool] = useState(false);
  const closeModal = (e) => {
    if (e.key === 'Escape' || e.type === 'Click') {
      setImageUploadModal(false);
    }
    setImageUploadModal(false);
  };
  const imageURLGenerator = (imgPath) => {
    const options = {
      url: 'http://localhost:3000/api/image',
      method: 'post',
      data: { imgPath },
    };
    axios(options)
      .then(({ data }) => setSubmitReview({
        ...submitReview,
        photos: [...submitReview.photos, data],
      }))
      .catch((err) => console.error(err));
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

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setProgress(prevProgress => prevProgress + (100 / 30));
    // }, 100);
    // return () => {
    //   clearInterval(interval);
    // };
    if (progressBool) {
      console.log(selectedImage)
      console.log('this should appear with each upload')
    }
  }, [selectedImage]);


  return ReactDOM.createPortal((
    <div className="write-review-modal">
      <div className="write-review-modal-parent" style={{position: 'relative', flexDirection: 'column'}}>
        <div style={{position: 'sticky', top: '0'}}>
          <button type="button" onClick={(e) => closeModal(e)} style={{position: 'sticky', top: '0'}}>Back</button>
          {selectedImage.length < 5 && (
            <>
              <div
                style={{position: 'absolute', top: '0', left: '86.4%', height: '200px', width: '200px', backgroundColor: 'green', border: 'inset black 0.25rem'}}
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
                  style={{position: 'absolute', bottom: '5px', left: '5px', right: '0px', fontSize: '.8rem'}}
                >
                  Drag-N-Drop!
                </p>
              </div>
              <input
                style={{position: 'absolute', top: '0', left: '86.4%', cursor: 'none'}}
                type="file"
                name="myImage"
                onChange={(event) => {
                  setSelectedImage([...selectedImage, event.target.files[0]]);
                  setProgressBool(true);
                  handleSubmit(event.target.files[0]);
                }}
              />
            </>
          )}
        </div>
        <h1 className="write-review-thumbnail">Show us your look!</h1>
        {selectedImage
          ? selectedImage.map((image, index) => (
            <div key={index} className="write-review-thumbnail">
              <img alt="not found" width={"250px"} src={URL.createObjectURL(image)} />
              <br />
              <button style={{marginBottom: '2rem'}} type="button" onClick={() => setSelectedImage(selectedImage.filter((_, i) => i !== index))}>
                Remove
              </button>
            </div>
          ))
          : null}
        {progressBool ? (
          <div className="upload-image-progress-bar">
            <div
              className="upload-image-progress-bar-value"
              style={{ width: `${progress}%`, animation: 'progress 2s linear' }}
            />
          </div>
        ) : null}
        <br />
        <br />
        <div className="test-test-test-test">
          {/* {selectedImage.length < 5 && (
            <input
              style={{position: 'absolute', bottom: '0', left: '55%', transform: 'translateX(-50%)', color: 'white'}}
              type="file" //USE COLOR WHITE TO HIDE TEXT
              name="myImage"
              onChange={(event) => {
                console.log(URL.createObjectURL(event.target.files[0]));
                setSelectedImage([...selectedImage, event.target.files[0]]);
              }}
            />
          )} */}
        </div>
      </div>
    </div>), document.getElementById('modal'));
}
