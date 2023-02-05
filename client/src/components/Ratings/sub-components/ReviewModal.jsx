import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import ReviewModalStars from './ReviewModalStars.jsx';
import ModalCharRadioBtns from './ModalCharRadioBtns.jsx';
import SubmitReview from './SubmitReview.jsx';
import UploadAndDisplayImage from './UploadImageModal.jsx';

export default function ReviewModal({ setReviewModal, feature, reviewMeta }) {
  // STATE DATA
  const [starRatingText, setStarRatingText] = useState('');
  const [summaryCount, setSummaryCount] = useState(0);
  const [bodyCount, setBodyCount] = useState(0);
  const [characteristics, setChars] = useState({});
  const [newReview, setNewReview] = useState({ product_id: feature.id, photos: [] });

  // image modal state - currently out of order
  const [imageUploadModal, setImageUploadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [imgProgress, setImgProgress] = useState({
    0: false, 1: false, 2: false, 3: false, 4: false,
  });

  // EVENT HANDLERS // Needs better functionality to exit Modal w/o Mouse - REFACTOR LATER
  const closeModalKeyPress = (e) => {
    if (e.key === 'Escape') {
      setReviewModal(false);
    }
  };

  const starRatingTextHandler = (value) => {
    if (value === 1) {
      setStarRatingText('Poor');
      setNewReview({ ...newReview, rating: value });
    }
    if (value === 2) {
      setStarRatingText('Fair');
      setNewReview({ ...newReview, rating: value });
    }
    if (value === 3) {
      setStarRatingText('Average');
      setNewReview({ ...newReview, rating: value });
    }
    if (value === 4) {
      setStarRatingText('Good');
      setNewReview({ ...newReview, rating: value });
    }
    if (value === 5) {
      setStarRatingText('Great');
      setNewReview({ ...newReview, rating: value });
    }
  };

  const handleSummaryChange = (e) => {
    setSummaryCount(e.target.value.length);
    setNewReview({ ...newReview, summary: e.target.value });
  };

  const handleBodyChange = (e) => {
    setBodyCount(e.target.value.length);
    setNewReview({ ...newReview, body: e.target.value });
  };

  const handleRecommendation = (e) => {
    const { value } = e.target;
    setNewReview({ ...newReview, recommend: value === 'yes' });
  };

  const handleNameChange = (e) => {
    setNewReview({ ...newReview, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setNewReview({ ...newReview, email: e.target.value });
  };

  return ReactDOM.createPortal((
    <div className="write-review-modal">
      <div className="write-review-modal-parent">
        <button className="close-review-modal" type="button" onClick={() => setReviewModal(false)}>X</button>
        <p>Write your review</p>
        <p>
          About
          {' '}
          {feature.name}
        </p>
        <div style={{ display: 'flex' }}>
          {' '}
          {/* Rename and Refactor */}
          <ReviewModalStars
            onChange={starRatingTextHandler}
          />
          <p>{starRatingText}</p>
        </div>
        <div>
          <p>Do you recommend this product?</p>
          <label htmlFor="recommendation-yes">
            <input type="radio" name="recommendation-yes" value="yes" onChange={handleRecommendation} />
            Yes
          </label>
          <label htmlFor="recommendation-no">
            <input type="radio" name="recommendation-no" value="no" onChange={handleRecommendation} />
            No
          </label>
        </div>
        <div>
          <p>Tell us more...</p>
          {reviewMeta
            ? (
              <ModalCharRadioBtns
                reviewMeta={reviewMeta}
                characteristics={characteristics}
                setChars={setChars}
              />
            ) : null}
        </div>
        <div className="review-summ-container">
          <p className="review-summ-label">Review Summary</p>
          <div className="form__group1">
            <textarea type="input" className="form__field1" placeholder="summary" name="summary" id="summary" maxLength="60" onChange={handleSummaryChange} ref={useRef()} required />
            <label htmlFor="summary" className="form__label1">Give it a title (ex: OMG totes amazing)</label>
          </div>
          {summaryCount
            ? (
              <p className="write-review-character-count">
                Character Count:
                {summaryCount}
              </p>
            )
            : <br />}
        </div>
        <div className="review-summ-container">
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Write your review below</p>
          <div className="form__group1">
            <textarea type="input" className="form__field1" placeholder="body" name="body" id="body" maxLength="1000" onChange={handleBodyChange} ref={useRef()} required />
            <label htmlFor="body" className="form__label1">Tell us about your purchase! (ex: I loved it!)</label>
          </div>
          <p className="write-review-character-count">
            {bodyCount >= 50
              ? 'Minimum Reached!'
              : `Minimum required characters left: ${50 - bodyCount}`}
          </p>
        </div>
        <br />
        <br />
        <div className="write-review-email-parent">
          <button
            className="upload-photos-btn"
            type="button"
            onClick={() => setImageUploadModal(true)}
          >
            Upload Your Pics!
          </button>
          <div className="form__group field">
            <input type="input" className="form__field" placeholder="nickname" name="nickname" id="nickname" maxLength="60" onChange={handleNameChange} required />
            <label htmlFor="nickname" className="form__label">Nickname</label>
          </div>
          <p className="email-disclaimer">For privacy reasons, do not use your full name or email address</p>
        </div>
        <div className="write-review-email-parent">
          <div className="form__group field">
            <input type="input" className="form__field" placeholder="Name" name="name" id="name" maxLength="60" onChange={handleEmailChange} required />
            <label htmlFor="name" className="form__label">Email</label>
          </div>
          <p className="email-disclaimer">For authentication reasons, you will not be emailed</p>
        </div>
        <div>
          <SubmitReview
            newReview={newReview}
            chars={characteristics}
            setChars={setChars}
            setNewReview={setNewReview}
            setReviewModal={setReviewModal}
          />
        </div>
        {imageUploadModal
          ? (
            <UploadAndDisplayImage
              setImageUploadModal={setImageUploadModal}
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
              newReview={newReview}
              setNewReview={setNewReview}
              imgProgress={imgProgress}
              setImgProgress={setImgProgress}
            />
          ) : null}
      </div>
    </div>), document.getElementById('modal'));
}
