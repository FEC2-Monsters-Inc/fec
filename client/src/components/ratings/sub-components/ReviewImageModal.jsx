import React from 'react';
import ReactDOM from 'react-dom';

export default function ReviewImageModal({ imgString, setModalToggle }) {
  const closeModal = (e) => {
    if (e.target.className === 'review-image-modal-full-container') {
      setModalToggle(false);
    }
  };
  return ReactDOM.createPortal((
    <div className="review-image-modal-full-container" onClick={(e)=>closeModal(e)}>
      <div className="review-image-modal-full-parent">
        <div className="review-image-modal-thumbnail">
          <img src={imgString} alt="thumbnail" />
        </div>
      </div>
    </div>), document.getElementById('modal'));
}


        {/* <button type="button" onClick={onCloseClick}>
          Close
        </button> */}

        // {console.log('modal loaded')}