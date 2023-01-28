import React from 'react';
import ReviewTile from './ReviewTile.jsx';

export default function ReviewList({reviews, selectedRating}) {

  const reviewMapper = reviews.map((review, index) =>
    <ReviewTile review={review} key={index}/>
  );

  const filterReviewMapper = () => {
    const filteredReviews = reviews.filter(review => review.rating === selectedRating);
    if (filteredReviews.length === 0) {
      return reviewMapper;
    } else {
      return filteredReviews.map((review, index) =>
        <ReviewTile review={review} key={index}/>
      );
    }
  };


  return (
    <div className="review-list-container">
      <p>{reviews.length} reviews, sorted by relevance</p>
      {filterReviewMapper()}
    </div>
  );
}
