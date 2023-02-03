import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import WriteReviewStarRating from './WriteReviewStarRating.jsx';
import CharacteristicRadioButtons from './CharacteristicRadioButtons.jsx';
import UploadAndDisplayImage from './WriteReviewUploadImage.jsx';

export default function WriteReviewModal({ setWriteModal, feature, reviewMeta }) {
  // STATE DATA
  const [starRatingText, setStarRatingText] = useState('');
  const [summaryCount, setSummaryCount] = useState(0);
  const [bodyCount, setBodyCount] = useState(0);
  const [imageUploadModal, setImageUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const summaryRef = useRef();
  const bodyRef = useRef();
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
  const handleSummaryChange = (e) => {
    setSummaryCount(e.target.value.length);
  };
  const handleBodyChange = (e) => {
    setBodyCount(e.target.value.length);
  }

  return ReactDOM.createPortal((
    <div className="write-review-modal">
      <div className="write-review-modal-parent" style={{position: 'relative'}}>
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
          <p style={{textAlign: 'center', marginBottom: '2rem'}}>Review Summary</p>
          <textarea ref={summaryRef} maxLength="60" placeholder="Example: Best purchase ever!" className="write-review-summary" onChange={handleSummaryChange} />
          {summaryCount
            ? (
              <p className="write-review-character-count">
                Character Count:
                {summaryCount}
              </p>
            )
            : <br />}
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <p style={{textAlign: 'center', marginBottom: '2rem'}}>Write your review below</p>
          <textarea ref={bodyRef} maxLength="1000" placeholder="Why did you like the product?" className="write-review-summary" onChange={handleBodyChange} />
          <p className="write-review-character-count">
            {bodyCount >= 50
              ? 'Minimum Reached!'
              : `Minimum required characters left: ${50 - bodyCount}`}
          </p>
        </div>
        <br />
        <br />
        <div style={{textAlign: 'center'}}>
          <p style={{fontSize: '1.25rem'}}>What's your name?</p>
          <br />
          <input type="text" placeholder="Example: jackson11!" maxLength="60" style={{width: "240px"}}/>
          <p style={{fontSize: '0.75rem', fontStyle: 'italic'}}>For privacy reasons, do not use your full name or email address.</p>
        </div>
        <button type="button" onClick={() => setImageUploadModal(true)} style={{position: 'sticky', bottom: '0', fontSize: ".7rem", borderRadius: "25%"}}>
          Upload
          <br />
          Your
          <br />
          Pics!
        </button>
        {imageUploadModal
          ? (
            <UploadAndDisplayImage
              setImageUploadModal={setImageUploadModal}
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
            />
          ) : null}
      </div>
    </div>), document.getElementById('modal'));
}


// onClick={ (e) => closeModal(e)}