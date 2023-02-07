import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import ReviewModalStars from './ReviewModalStars.jsx';
import ModalCharRadioBtns from './ModalCharRadioBtns.jsx';
import SubmitReview from './SubmitReview.jsx';
import UploadAndDisplayImage from './UploadImageModal.jsx';

export default function ReviewModal({
  setReviewModal, feature, reviewMeta, setReviewMeta, setReviews,
}) {
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

  const closeModal = () => {
    document.querySelector('.write-review-modal').classList.remove('denial');
    document.querySelector('.write-review-modal').classList.add('exiting');
    setTimeout(() => {
      setReviewModal(false);
    }, 200);
  };

  const starRatingTextHandler = (value) => {
    if (value === 1) {
      setStarRatingText('Poor');
      setNewReview({ ...newReview, rating: value });
      document.querySelector('.review-asterisk-stars').classList.remove('red');
    }
    if (value === 2) {
      setStarRatingText('Fair');
      setNewReview({ ...newReview, rating: value });
      document.querySelector('.review-asterisk-stars').classList.remove('red');
    }
    if (value === 3) {
      setStarRatingText('Average');
      setNewReview({ ...newReview, rating: value });
      document.querySelector('.review-asterisk-stars').classList.remove('red');
    }
    if (value === 4) {
      setStarRatingText('Good');
      setNewReview({ ...newReview, rating: value });
      document.querySelector('.review-asterisk-stars').classList.remove('red');
    }
    if (value === 5) {
      setStarRatingText('Great');
      setNewReview({ ...newReview, rating: value });
      document.querySelector('.review-asterisk-stars').classList.remove('red');
    }
  };

  const handleSummaryChange = (e) => {
    setSummaryCount(e.target.value.length);
    setNewReview({ ...newReview, summary: e.target.value });
  };

  const handleBodyChange = (e) => {
    setBodyCount(e.target.value.length);
    setNewReview({ ...newReview, body: e.target.value });
    if (e.target.value.length > 50) {
      document.querySelector('.review-asterisk-body').classList.remove('red');
    }
  };

  const handleRecommendation = (e) => {
    const { value } = e.target;
    setNewReview({ ...newReview, recommend: value === 'yes' });
    document.querySelector('.review-asterisk-recommend').classList.remove('red');
  };

  const handleNameChange = (e) => {
    setNewReview({ ...newReview, name: e.target.value });
    if (e.target.value.length) {
      document.querySelector('.review-asterisk-name').classList.remove('red');
    }
  };

  const handleEmailChange = (e) => {
    setNewReview({ ...newReview, email: e.target.value });
    if (e.target.value.match((/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/))) {
      document.querySelector('.review-asterisk-email').classList.remove('red');
    }
  };

  const handleRequiredName = () => {
    if (!newReview.name) {
      document.querySelector('.review-asterisk-name').classList.add('red');
    } else {
      document.querySelector('.review-asterisk-name').classList.remove('red');
    }
  };

  const handleRequiredEmail = () => {
    if (!newReview.email || !newReview.email.match((/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/))) {
      document.querySelector('.review-asterisk-email').classList.add('red');
    } else {
      document.querySelector('.review-asterisk-email').classList.remove('red');
    }
  };

  const handleRequiredBody = () => {
    if (!newReview.body || newReview.body.length <= 50) {
      document.querySelector('.review-asterisk-body').classList.add('red');
    } else {
      document.querySelector('.review-asterisk-body').classList.remove('red');
    }
  };

  const handleRequiredRecommend = () => { // Will only be called with handleSubmit.
    if (newReview.recommend === undefined) {
      document.querySelector('.review-asterisk-recommend').classList.add('red');
    } else {
      document.querySelector('.review-asterisk-recommend').classList.remove('red');
    }
  };

  const handleRequiredStars = () => { // Will only be called with handleSubmit.
    if (!newReview.rating) {
      document.querySelector('.review-asterisk-stars').classList.add('red');
    } else {
      document.querySelector('.review-asterisk-stars').classList.remove('red');
    }
  };

  const handleRequiredChars = (characteristic) => {
    const asterisk = document.querySelector(`.review-asterisk-radiobtns-${characteristic}`);
    const radioBtns = document.querySelectorAll('.write-review-characteristics-modal');
    let isChecked = false;
    radioBtns.forEach((radioBtn) => {
      if (radioBtn.checked) {
        isChecked = true;
      }
    });
    if (!isChecked) {
      asterisk.classList.add('red');
    } else {
      asterisk.classList.remove('red');
    }
  };

  return ReactDOM.createPortal((
    <div className="write-review-modal">
      <div className="write-review-modal-parent">
        <button className="close-review-modal" type="button" onClick={() => closeModal()}>&times;</button>
        <p className="write-review-modal-title">
          Write your review about
          {' '}
          {feature.name}
        </p>
        <div className="review-modal-star-container" onBlur={() => handleRequiredStars()}>
          {' '}
          {/* Rename and Refactor */}
          <ReviewModalStars
            onChange={starRatingTextHandler}
          />
          <span className="review-asterisk-stars">*</span>
          <p>{starRatingText}</p>
        </div>
        <div className="review-modal-recommendation-container" onBlur={() => handleRequiredRecommend()}>
          <p>
            Do you recommend this product?
            {' '}
            <span className="review-asterisk-recommend">*</span>
          </p>
          <label htmlFor="recommendation-yes">
            <input type="radio" name="recommendation" value="yes" onChange={handleRecommendation} />
            Yes
          </label>
          <label htmlFor="recommendation-no">
            <input type="radio" name="recommendation" value="no" onChange={handleRecommendation} />
            No
          </label>
        </div>
        <div>
          <p className="review-modal-characteristics-title">How did you like the...</p>
          {reviewMeta
            ? (
              <ModalCharRadioBtns
                reviewMeta={reviewMeta}
                characteristics={characteristics}
                setChars={setChars}
                handleRequiredChars={handleRequiredChars}
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
          <p className="review-body-title">Write your review below</p>
          <div className="form__group1" onBlur={(e) => handleRequiredBody(e)}>
            <textarea type="input" className="form__field1" placeholder="body" name="body" id="body" maxLength="1000" onChange={handleBodyChange} ref={useRef()} required />
            <label htmlFor="body" className="form__label1">
              Tell us about your purchase! (ex: I loved it!)
              <span className="review-asterisk-body">*</span>
            </label>
          </div>
          <p className="write-review-character-count">
            {bodyCount > 50
              ? <span className="review-body-minimum-reached">Minimum Reached!</span>
              : `Minimum required characters left: ${51 - bodyCount}`}
          </p>
        </div>
        <br />
        <br />
        <div className="write-review-email-parent">
          <UploadAndDisplayImage
            setImageUploadModal={setImageUploadModal}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            newReview={newReview}
            setNewReview={setNewReview}
            imgProgress={imgProgress}
            setImgProgress={setImgProgress}
          />
          <div className="form__group field" onBlur={() => handleRequiredName()}>
            <input type="input" className="form__field" placeholder="nickname" name="nickname" id="nickname" maxLength="60" onChange={handleNameChange} required />
            <label htmlFor="nickname" className="form__label">
              Nickname
              <span className="review-asterisk-name">*</span>
            </label>
          </div>
          <p className="email-disclaimer">For privacy reasons, do not use your full name or email address</p>
        </div>
        <div className="write-review-email-parent" onBlur={(e) => handleRequiredEmail(e)}>
          <div className="form__group field">
            <input type="input" className="form__field" placeholder="Name" name="name" id="name" maxLength="60" onChange={handleEmailChange} required />
            <label htmlFor="name" className="form__label">
              Email
              <span className="review-asterisk-email">*</span>
            </label>
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
            feature={feature}
            setReviewMeta={setReviewMeta}
            setReviews={setReviews}
            handleRequiredName={handleRequiredName}
            handleRequiredBody={handleRequiredBody}
            handleRequiredEmail={handleRequiredEmail}
            handleRequiredStars={handleRequiredStars}
            handleRequiredRecommend={handleRequiredRecommend}
            reviewMeta={reviewMeta}
            handleRequiredChars={handleRequiredChars}
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
