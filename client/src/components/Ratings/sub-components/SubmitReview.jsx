import React from 'react';
import fetcher from '../../../fetchers';

export default function SubmitReview({
  newReview, chars, setChars, setNewReview, setReviewModal, feature, setReviews, setReviewMeta,
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
    fetcher.getReviewMeta(feature.id)
      .then(({ data }) => setReviewMeta(data))
      .catch((err) => console.err('Error getting Review Meta after submit: ', err));
    fetcher.getReviews(feature.id)
      .then(({ data }) => setReviews(data.results))
      .catch((err) => console.err('Error getting Reviews after submit: ', err));
  };

  return (
    <div className="submit-review-btn">
      <button type="button" onClick={() => addReview()}>Submit Review</button>
    </div>
  );
}
