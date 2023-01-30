import React, { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx';

export default function ReviewList({ reviews, selectedRating }) {
  const [numReviews, setNumReviews] = useState(reviews.length);
  const reviewMapper = reviews.map((review) => (
    <ReviewTile
      review={review}
      key={review.review_id}
    />
  ));

  const filterReviewMapper = () => {
    const filteredReviews = reviews.filter((review) => selectedRating[review.rating] === true);
    if (filteredReviews.length === 0) {
      return reviewMapper;
    }
    return filteredReviews.map((review) => (
      <ReviewTile
        review={review}
        key={review.review_id}
      />
    ));
  };

  const numReviewsTracker = () => {
    const trueKeys = Object.keys(selectedRating)
      .filter((key) => selectedRating[key] === true)
      .map(Number);
    const filteredArr = reviews.filter((review) => trueKeys.includes(review.rating));
    if (filteredArr.length === 0) {
      setNumReviews(reviews.length);
      return;
    }
    setNumReviews(filteredArr.length);
  };

  useEffect(() => {
    numReviewsTracker();
  }, [selectedRating, reviews]);

  const numReviewsText = () => {
    if (numReviews === 0) {
      return 'No Reviews';
    } if (numReviews === 1) {
      return '1 review, sorted by relevance';
    }
    return `${numReviews} reviews, sorted by relevance`;
  };

  return (
    <div className="review-list-container">
      <p>{numReviewsText()}</p>
      {filterReviewMapper()}
    </div>
  );
}
