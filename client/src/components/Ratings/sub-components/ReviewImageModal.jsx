import React from 'react';
import ReactDOM from 'react-dom';

export default function ReviewImageModal({ imgString, setModalToggle }) {
  // EVENT HANDLERS //
  const closeModal = (e) => {
    setModalToggle(false);
  };

  return ReactDOM.createPortal((
    <div className="review-image-modal-full-container" onClick={(e) => closeModal(e)}>
      <div className="review-image-modal-full-parent">
        <div className="review-image-modal-thumbnail">
          <img src={imgString} alt="thumbnail" />
        </div>
      </div>
    </div>), document.getElementById('modal'));
}
