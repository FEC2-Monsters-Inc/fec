import React, { useState, useEffect } from 'react';
import fetcher from '../../fetchers';
import './ratings.css';
import ReviewDashboard from './sub-components/ReviewDashboard.jsx';
import ReviewList from './sub-components/ReviewList.jsx';
import axios from 'axios';

export default function Ratings({
  feature
}) {

  const [reviews, setReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  });

  useEffect(() => {
    fetcher.ratings.getReviews(40348)
      .then(({data}) => setReviews(data.results))
      .catch((error) => console.log(error));
  }, [feature]);

  return (
    <div>
      <div className="review-header">Ratings and Reviews</div>
      <div className="ratings-parent">
        <ReviewDashboard reviews={reviews} setSelectedRating={setSelectedRating} selectedRating={selectedRating}/>
        <ReviewList reviews={reviews} selectedRating={selectedRating}/>
      </div>
    </div>
  );
}

