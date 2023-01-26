import React from 'react';

export default function ReviewTile({review}) {

  const starRater = function() {
    var stars = '';
    for (var i = 0; i < review.rating; i++) {
      stars += '*';
    }
    return stars;
  };

  return (
    <div>
      {console.log(review)}
      <div>
        <h4>{review.summary}</h4>
        <div>{starRater()}</div>
        <h5>{review.reviewer_name}</h5>
        <h6>{review.date}</h6>
      </div>
      <div>

      </div>
    </div>
  );
}