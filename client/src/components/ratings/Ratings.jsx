import React, { useState, useEffect } from 'react';
import ReviewDashboard from './sub-components/ReviewDashboard.jsx';
import ReviewList from './sub-components/ReviewList.jsx';
import fetcher from '../../fetchers';
import './ratings.css';

export default function Ratings({
  reviews,
  setReviews,
  reviewMeta,
  feature,
}) {
  // STATE DATA //
  const [selectedRating, setSelectedRating] = useState(null);
  const [listLength, setListLength] = useState(0);
  const [listIndex, setListIndex] = useState(0);

  // useEffect(() => {
  //   fetcher.ratings.getAllReviews(40350)
  //     .then(({ data }) => setLoadedReviews(data.results));
  // });

  return (
    <div id="ratings-widget">
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
        />
      </div>
    </div>
  );
}
