import React, { useState, useEffect } from 'react';
import fetcher from '../../fetchers';
import ReviewTile from './sub-components/ReviewTile.jsx';
import ReviewDashboard from './sub-components/ReviewDashboard.jsx';
import axios from 'axios';

export default function Ratings({
  feature
}) {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetcher.ratings.getReviews(40348)
      .then(({data}) => setReviews([...data.results]))
      .catch((error) => console.log(error));
  }, []);

  const reviewMapper = reviews.map((review, index) =>
    <ReviewTile review={review} key={index}/>
  );

  return (
    <div>
      <h3>Reviews and Ratings for product_id: 40348</h3>
      <div>
        <div>
          <ReviewDashboard reviews={reviews}/>
        </div>
        <div>
          {reviewMapper}
        </div>
      </div>
    </div>
  );
}

