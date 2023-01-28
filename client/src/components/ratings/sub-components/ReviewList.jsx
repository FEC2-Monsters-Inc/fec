import React from 'react';
import ReviewTile from './ReviewTile.jsx';

export default function ReviewList({reviews}) {

  const reviewMapper = reviews.map((review, index) =>
    <ReviewTile review={review} key={index}/>
  );

  return (
    <div className="review-list-container">
      <p>{reviews.length} reviews, sorted by relevance</p>
      {reviewMapper}
    </div>
  );
}
