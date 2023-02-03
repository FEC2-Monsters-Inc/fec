import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function UploadAndDisplayImage({
  setImageUploadModal,
  selectedImage,
  setSelectedImage,
}) {
  const closeModal = (e) => {
    if (e.key === 'Escape' || e.type === 'Click') {
      setImageUploadModal(false);
    }
    setImageUploadModal(false);
  };

  return ReactDOM.createPortal((
    <div className="write-review-modal">
      <div className="write-review-modal-parent" style={{position: 'relative', flexDirection: 'column'}}>
        <div style={{position: 'sticky', top: '0'}}>
          <button type="button" onClick={(e) => closeModal(e)} style={{position: 'sticky', top: '0'}}>Back</button>
          {selectedImage.length < 5 && (
            <input
              style={{position: 'sticky', top: '0', left: '100%'}}
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage([...selectedImage, event.target.files[0]]);
              }}
            />
          )}
        </div>
        <h1 className="write-review-thumbnail">Show us your look!</h1>
        {selectedImage.map((image, index) => (
          <div key={index} className="write-review-thumbnail">
            <img alt="not found" width={"250px"} src={URL.createObjectURL(image)} />
            <br />
            <button style={{marginBottom: '2rem'}} type="button" onClick={() => setSelectedImage(selectedImage.filter((_, i) => i !== index))}>
              Remove
            </button>
          </div>
        ))}
        <br />
        <br />
        <div className="test-test-test-test">
          {selectedImage.length < 5 && (
            <input
              style={{position: 'absolute', bottom: '0', left: '55%', transform: 'translateX(-50%)', color: 'white'}}
              type="file" //USE COLOR WHITE TO HIDE TEXT
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage([...selectedImage, event.target.files[0]]);
              }}
            />
          )}
        </div>
      </div>
    </div>), document.getElementById('modal'));
}
