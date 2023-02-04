import React from 'react';
import ReactDOM from 'react-dom';

export default function ReviewImageModal({ imgString, setModalToggle, name }) {
  // EVENT HANDLERS // Needs better functionality to exit Modal w/o Mouse - REFACTOR LATER
  const closeModal = (e) => {
    if (e.key === 'Escape' || e.type === 'Click') {
      setModalToggle(false);
    }
    setModalToggle(false);
  };

  return ReactDOM.createPortal((
    <div
      className="review-image-modal-full-container"
      onClick={(e) => closeModal(e)}
      onKeyPress={(e) => closeModal(e)}
      role="button"
      tabIndex={0}
    >
      <div className="review-image-modal-full-parent">
        <div className="review-image-modal-thumbnail">
          <img src={imgString} alt={`${name}'s picture`} />
        </div>
      </div>
    </div>), document.getElementById('modal'));
}
