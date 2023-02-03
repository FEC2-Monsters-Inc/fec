import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import WriteReviewStarRating from './WriteReviewStarRating.jsx';

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

  const RadioButtonRow = () => Object.keys(reviewMeta.characteristics).map((characteristic) => (
    <div className="review-radio-row-container">
      <div className="radio-row-title">{characteristic}</div>
      {[1, 2, 3, 4, 5].map((number) => (
        <div className="review-characteristics-modal-container">
          <div style={{width: '75px'}}>
            <label className="write-review-modal-label" htmlFor={characteristic}>
              {characteristicMapper(characteristic)[number - 1]}
            </label>
            <input
              type="radio"
              name={characteristic}
              value={number}
              key={number}
              id={number + characteristic}
              className="write-review-characteristics-modal"
            />
          </div>
        </div>
      ))}
    </div>
  ));

  const characteristicMapper = (x) => {
    if (x === 'Size') {
      return ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too big'];
    }
    if (x === 'Width') {
      return ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'];
    }
    if (x === 'Fit') {
      return ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs too long'];
    }
    if (x === 'Length') {
      return ['Runs short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];
    }
    if (x === 'Comfort') {
      return ['Uncomfortable', 'Slightly uncomfortable', 'OK', 'Comfortable', 'Perfect'];
    }
    if (x === 'Quality') {
      return ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'];
    }
    return null;
  };

  return ReactDOM.createPortal((
    <div className="write-review-modal">{console.log(reviewMeta.characteristics)}
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
          {reviewMeta ? RadioButtonRow() : null}
        </div>
        <form>
          <input type="text"/>
        </form>
      </div>
    </div>), document.getElementById('modal'));
}


// onClick={ (e) => closeModal(e)}