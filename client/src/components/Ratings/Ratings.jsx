import React, { useState } from 'react';
import ReviewDashboard from './sub-components/ReviewDashboard.jsx';
import ReviewList from './sub-components/ReviewList.jsx';
import './ratings.css';

export default function Ratings({
  reviews,
  setReviews,
  reviewMeta,
  feature,
  setReviewMeta,
  recordClick,
}) {
  // STATE DATA //
  const [selectedRating, setSelectedRating] = useState(null);
  const [listLength, setListLength] = useState(0);
  const [listIndex, setListIndex] = useState(2);

  return (
    // eslint-disable-next-line -- not meant to be interactive
    <div id="ratings-widget" onClick={(e) => recordClick(e, 'Ratings & Reviews')}>
      <h1 className="review-header">Ratings and Reviews</h1>
      <div className="ratings-parent">
        <ReviewDashboard
          reviews={reviews}
          setSelectedRating={setSelectedRating}
          selectedRating={selectedRating}
          reviewMeta={reviewMeta}
          listLength={listLength}
          setListLength={setListLength}
          listIndex={listIndex}
          setListIndex={setListIndex}
        />
        <ReviewList
          reviews={reviews}
          selectedRating={selectedRating}
          setReviews={setReviews}
          listLength={listLength}
          setListLength={setListLength}
          listIndex={listIndex}
          setListIndex={setListIndex}
          feature={feature}
          reviewMeta={reviewMeta}
          setReviewMeta={setReviewMeta}
        />
      </div>
    </div>
  );
}
