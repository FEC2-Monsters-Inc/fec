import React, { useState, useEffect, useRef } from 'react';
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
  const [reviewExpander, setReviewExpander] = useState('25rem');
  const [expandedStatus, setExpandedStatus] = useState(false);
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

  const handleScroll = (e) => {
    const bottom = Math.round(e.currentTarget.scrollHeight - e.currentTarget.scrollTop)
     === Math.round(e.currentTarget.clientHeight);
    if (bottom) {
      twoAtATime();
    }
  };
  const handleClick = () => {
    twoAtATime();
    setReviewExpander('50rem');
    setExpandedStatus(true);
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
          reviewRenderer={reviewRenderer}
        />
      </div>
      <div className="scroll-review-list" onScroll={(e) => handleScroll(e)} style={{height: reviewExpander}}>
        { reviews
          ? reviewRenderer()
          : null }
      </div>
      <div>
        {
          !expandedStatus
            ? <button onClick={()=>handleClick()}>Expand Reviews</button>
            : null
        }
      </div>
    </div>
  );
}
