import React from 'react';
import fetcher from '../../../fetchers';

export default function SubmitReview({ submitReview }) {
  // Fetcher fo
  const funkyTown = (rvw) => {
    fetcher.ratings.addReviews(rvw)
      .then((data) => console.log(data))
      .catch((err) => console.log(err))
  };
  return (
    <div>
      <button type="button" onClick={() => funkyTown(submitReview)}>Submit your Review!</button>
    </div>
  );
}
