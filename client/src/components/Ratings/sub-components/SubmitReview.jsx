import React, { useState } from 'react';
import fetcher from '../../../fetchers';

export default function SubmitReview({
  newReview,
  chars,
  setChars,
  setNewReview,
  setReviewModal,
  feature,
  setReviews,
  setReviewMeta,
  handleRequiredRecommend,
  handleRequiredStars,
  handleRequiredName,
  handleRequiredEmail,
  handleRequiredBody,
  reviewMeta,
  handleRequiredChars,
  setShowThankyou,

}) {
  // STATE DATA //
  const [validReview, setValidReview] = useState(true);

  // HELPER FUNCTIONS //

  const handleRequiredCharsHelper = () => {
    Object.keys(reviewMeta.characteristics).forEach((characteristic) => {
      handleRequiredChars(characteristic);
    });
  };

  const invalidReview = () => {
    setValidReview(false);
    document.querySelector('.write-review-modal').classList.add('denial');
    handleRequiredRecommend();
    handleRequiredStars();
    handleRequiredName();
    handleRequiredEmail();
    handleRequiredBody();
    handleRequiredCharsHelper();
  };

  // EVENT HANDLERS //

  const addReview = () => {
    const finalReview = {};
    Object.assign(finalReview, newReview);
    finalReview.characteristics = chars;
    fetcher.addReviews(finalReview)
      .then(() => {
        setNewReview({ product_id: newReview.product_id, photos: [] });
        setChars({});
        setReviewModal(false);
        setValidReview(true);
      })
      .catch((err) => invalidReview());
    fetcher.getReviewMeta(feature.id)
      .then(({ data }) => setReviewMeta(data))
      .catch((err) => console.err('Error getting Review Meta after submit: ', err));
    fetcher.getReviews(feature.id)
      .then(({ data }) => setReviews(data.results))
      .catch((err) => console.err('Error getting Reviews after submit: ', err));
    setShowThankyou(true);
  };

  // HELPER FUNCTIONS//

  const ThankYouWindow = () => {
    const x = window.open('', '', 'width=400, height=200');
    x.document.open();
    x.document.write('<h1>Thanks for submitting your review!</h1>');
    x.document.close();
    setTimeout(() => {
      x.close();
    }, 2000);
  };

  return (
    <div className="submit-review-btn-container">
      <button className="submit-review-btn" type="button" onClick={() => addReview()}>Submit Review</button>
      {validReview ? null : <p className="submit-bad-review">Please Complete All Mandatory*Fields</p>}
    </div>
  );
}
