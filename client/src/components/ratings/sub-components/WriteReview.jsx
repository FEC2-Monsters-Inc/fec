import React from 'react';
import ReactDOM from 'react-dom';
import WriteReviewStarRating from './WriteReviewStarRating.jsx';

export default function WriteReviewModal({ setWriteModal, feature }) {
  // EVENT HANDLERS // Needs beeter functionality to exit Modal w/o Mouse
  const closeModal = (e) => {
    if (e.key === 'Escape' || e.type === 'Click') {
      setWriteModal(false);
      console.log(feature);
    }
    console.log(feature);
    setWriteModal(false);
  };
  function log(value) {
    console.log(value);
  }

  return ReactDOM.createPortal((
    <div className="write-review-modal" >
      <div style={{ background: 'white', height: '25rem', width: '25rem' }}>
        <p>Write your review</p>
        <p>About {feature.name}</p>
        <WriteReviewStarRating onChange={log} />
        <form>
          <input type="text"/>
        </form>
      </div>
    </div>), document.getElementById('modal'));
}


// onClick={ (e) => closeModal(e)}