import React from 'react';
import fetcher from '../../../fetchers';

export default function SubmitReview({
  newReview, chars, setChars, setNewReview, setReviewModal,
}) {
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
      })
      .catch((err) => console.error('error adding a new review: ', err));
  };

  return (
    <div className="submit-review-btn">
      <button type="button" onClick={() => addReview()}>Submit Review</button>
    </div>
  );
}
