import React, { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx';
import RelevanceDropdown from './RelevanceDropdown.jsx';

export default function ReviewList({
  reviews,
  selectedRating,
  setReviews,
  listLength,
  setListLength,
}) {
  // const [listLength, setListLength] = useState(0);
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
    // setListLength(filteredReviews.length);
    // console.log(listLength);
    return reviewMapper(filteredReviews);
  };

  // INITIALIZATION //
  useEffect(() => {

  }, [selectedRating, reviews]);

  return (
    <div className="review-list-container">
      <div className="review-list-dropdown-container">
        <RelevanceDropdown
          setReviews={setReviews}
          reviews={reviews}
          listLength={listLength}
          setListLength={setListLength}
        />
      </div>
      { reviews
        ? reviewRenderer()
        : null }
    </div>
  );
}
