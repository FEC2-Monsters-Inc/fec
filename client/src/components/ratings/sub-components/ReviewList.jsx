import React, { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx';
import RelevanceDropdown from './RelevanceDropdown.jsx';

export default function ReviewList({ reviews, selectedRating, setReviews }) {
  // HELPER FUNCTIONS //
  const reviewMapper = (reviewArray) => reviewArray.map((review) => (
    <ReviewTile
      review={review}
      key={review.review_id}
      reviews={reviews}
      setReviews={setReviews}
    />
  ));

  const reviewRenderer = () => {
    if (!selectedRating) {
      return reviewMapper(reviews);
    }
    const filteredReviews = reviews.filter((review) => selectedRating[review.rating] === true);
    return reviewMapper(filteredReviews);
  };

  // INITIALIZATION //
  useEffect(() => {

  }, [selectedRating, reviews]);

  return (
    <div className="review-list-container">
      <div className="review-list-dropdown-container">
        <RelevanceDropdown setReviews={setReviews} reviews={reviews} />
      </div>
      { reviews
        ? reviewRenderer()
        : null }
    </div>
  );
}
