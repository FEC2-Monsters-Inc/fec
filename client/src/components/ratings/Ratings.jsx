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
    let options = {
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews',
      method: 'get',
      headers: {
        'Authorization': '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'
      },
      params: {
        'product_id': 40348 //PLACEHOLDER***THIS WILL BE PASSED DOWN VIA PROP
      }
    };
    axios(options)
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