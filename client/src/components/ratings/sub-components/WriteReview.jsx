import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import WriteReviewStarRating from './WriteReviewStarRating.jsx';
import CharacteristicRadioButtons from './CharacteristicRadioButtons.jsx';

export default function WriteReviewModal({ setWriteModal, feature, reviewMeta }) {
  // STATE DATA
  const [starRatingText, setStarRatingText] = useState('');
  // EVENT HANDLERS // Needs beeter functionality to exit Modal w/o Mouse
  const closeModal = (e) => {
    if (e.key === 'Escape' || e.type === 'Click') {
      setWriteModal(false);
    }
    setWriteModal(false);
  };
  function starRatingTextHandler(value) {
    if (value === 1) {
      setStarRatingText('Poor');
    }
    if (value === 2) {
      setStarRatingText('Fair');
    }
    if (value === 3) {
      setStarRatingText('Average');
    }
    if (value === 4) {
      setStarRatingText('Good');
    }
    if (value === 5) {
      setStarRatingText('Great');
    }
  }

  return ReactDOM.createPortal((
    <div className="write-review-modal">
      <div style={{ background: 'white', height: '25rem', width: '40rem' }}>
        <p>Write your review</p>
        <p>About {feature.name}</p>
        <div style={{display: 'flex'}}> {/*Rename and Refactor */}
          <WriteReviewStarRating
            onChange={starRatingTextHandler}
          />
          <p>{starRatingText}</p>
        </div>
        <div>
          <p>Do you recommend this product?</p>
          <label htmlFor="recommendation-yes">
            <input type="radio" name="recommendation-yes" value="yes" />
            Yes
          </label>
          <label htmlFor="recommendation-no">
            <input type="radio" name="recommendation-no" value="no" />
            No
          </label>
        </div>
        <div>
          <p>Tell us more...</p>
          {reviewMeta ? <CharacteristicRadioButtons reviewMeta={reviewMeta} /> : null}
        </div>
        <form>
          <input type="text"/>
        </form>
      </div>
    </div>), document.getElementById('modal'));
}


// onClick={ (e) => closeModal(e)}