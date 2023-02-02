import React, { useState, useEffect } from 'react';
import ReviewTile from './ReviewTile.jsx';
import RelevanceDropdown from './RelevanceDropdown.jsx';
import fetcher from '../../../fetchers';

export default function ReviewList({
  reviews,
  selectedRating,
  setReviews,
  listLength,
  setListLength,
  listIndex,
  setListIndex,
}) {
  const [loadedReviews, setLoadedReviews] = useState([]);
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
      return reviewMapper(reviews.slice(0, listIndex));
    }
    const filteredReviews = reviews.slice(0, listIndex).filter((review) => selectedRating[review.rating] === true);
    return reviewMapper(filteredReviews);
  };

  const twoAtATime = () => {
    if (reviews.length - listIndex === 1) {
      setListIndex(listIndex + 1);
    }
    if (listIndex < reviews.length) {
      setListIndex(listIndex + 2);
    }
  };

  // INITIALIZATION //
  useEffect(() => {
    setListIndex(2);
  }, []);



  return (
    <div className="review-list-container">
      <div className="review-list-dropdown-container">
        <RelevanceDropdown
          setReviews={setReviews}
          reviews={reviews}
          listLength={listLength}
          setListLength={setListLength}
          listIndex={listIndex}
        />
      </div>
      <div className="scroll-review-list">
        { reviews
          ? reviewRenderer()
          : null }
      </div>
      <div className="review-list-add-more-button">
          <button onClick={()=>twoAtATime()}>click me</button>
      </div>
    </div>
  );
}
