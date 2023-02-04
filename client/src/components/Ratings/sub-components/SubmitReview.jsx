import React from 'react';
import fetcher from '../../../fetchers';

export default function SubmitReview({ submitReview }) {
  // Fetcher fo
  const funkyTown = (rvw) => {
    console.log('this is review data obj: ', rvw);
    fetcher.ratings.addReviews(rvw)
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  };
  return (
    <div>
      <button type="button" onClick={() => funkyTown({
    product_id: 40350,
    rating: 1,
    summary: 'this is a test summary',
    body: 'this has to be at least 50 characters so ill keep typing for a while',
    recommend: false,
    name: 'erik',
    email: 'erik1234@gmail.com',
    photos: [],
    characteristics: {135240: 1, 135241: 1, 135242: 1, 135243: 1},
  })}>Submit your Review!</button>
    </div>
  );
}
