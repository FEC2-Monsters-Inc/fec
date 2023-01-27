import React, { useState, useEffect } from 'react';
import fetcher from '../../fetchers';
import ReviewDashboard from './sub-components/ReviewDashboard.jsx';
import ReviewList from './sub-components/ReviewList.jsx';
import axios from 'axios';

export default function Ratings({
  feature
}) {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetcher.ratings.getReviews(40344)
      .then(({data}) => setReviews(data.results))
      .catch((error) => console.log(error));
  }, [feature]);

  return (
    <div>
      <h3>Ratings and Reviews</h3>
      <div id="ratings-parent">
        <ReviewDashboard reviews={reviews} />
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}

