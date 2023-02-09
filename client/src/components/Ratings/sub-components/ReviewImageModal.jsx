import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function ReviewImageModal({
  modalToggle, imgString, setModalToggle, name,
}) {
  // EVENT HANDLERS // Needs better functionality to exit Modal w/o Mouse - REFACTOR LATER
  const closeModal = (e) => {
    if (e.key === 'Escape' || e.type === 'Click') {
      setModalToggle(false);
    }
    setModalToggle(false);
  };

  useEffect(() => {
    if (modalToggle) {
      document.body.style.overflow = 'hidden';
    } else document.body.style.overflow = 'visible';
  }, [modalToggle]);

  if (!modalToggle) return null;
  return ReactDOM.createPortal((
    <div
      className="review-image-modal-full-container"
      onClick={(e) => closeModal(e)}
      onKeyPress={(e) => closeModal(e)}
      role="button"
      tabIndex={0}
    >
      <img
        className="review-image-modal"
        src={imgString}
        alt={`${name}'s picture`}
      />
    </div>), document.getElementById('modal'));
}
