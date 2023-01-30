import React, { useState, useEffect } from 'react';
import fetcher from '../../fetchers';
import './ratings.css';
import ReviewDashboard from './sub-components/ReviewDashboard.jsx';
import ReviewList from './sub-components/ReviewList.jsx';

export default function Ratings({
  feature,
}) {
  const [reviews, setReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [reviewMeta, setReviewMeta] = useState({});

  const metaDataFetcher = () => {
    fetcher.ratings.getReviewMeta(40348)
      .then(({ data }) => setReviewMeta(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetcher.ratings.getReviews(40348) // 40344 is our test
      .then(({ data }) => setReviews(data.results))
      .catch((error) => console.log(error));
    metaDataFetcher();
  }, [feature]);

  return (
    <div>
      <div className="review-header">Ratings and Reviews</div>
      <div className="ratings-parent">
        <ReviewDashboard
          reviews={reviews}
          setSelectedRating={setSelectedRating}
          selectedRating={selectedRating}
          reviewMeta={reviewMeta}
        />
        <ReviewList reviews={reviews} selectedRating={selectedRating} />
      </div>
    </div>
  );
}
