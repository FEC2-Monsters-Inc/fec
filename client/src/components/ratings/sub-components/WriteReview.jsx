import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import WriteReviewStarRating from './WriteReviewStarRating.jsx';
import CharacteristicRadioButtons from './CharacteristicRadioButtons.jsx';

export default function WriteReviewModal({ setWriteModal, feature, reviewMeta }) {
  // STATE DATA
  const [starRatingText, setStarRatingText] = useState('');
  const [charCount, setCharCount] = useState(0);
  const textAreaRef = useRef();
  // EVENT HANDLERS // Needs beeter functionality to exit Modal w/o Mouse
  const closeModal = (e) => {
    if (e.key === 'Escape' || e.type === 'Click') {
      setWriteModal(false);
    }
    setWriteModal(false);
  };
  const starRatingTextHandler = (value) => {
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
  };
  const handleReviewChange = (e) => {
    setCharCount(e.target.value.length);
  };

  return ReactDOM.createPortal((
    <div className="write-review-modal">
      <div className="write-review-modal-parent">
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
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <p style={{textAlign: 'center', marginBottom: '2rem'}}>Write your review below</p>
          <textarea ref={textAreaRef} maxLength="60" placeholder="Example: Best purchase ever!" className="write-review-textarea" onChange={handleReviewChange} />
          {charCount
            ? (
              <p className="write-review-character-count">
                Character Count:
                {charCount}
              </p>
            )
            : <br />}
        </div>
      </div>
    </div>), document.getElementById('modal'));
}


// onClick={ (e) => closeModal(e)}