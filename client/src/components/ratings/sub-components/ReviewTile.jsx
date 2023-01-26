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
        <div style={{display: 'flex'}}>
          <div style={{fontWeight: 'bold'}}>{review.summary}</div>
          <div style={{marginLeft: '20px'}}>{starRater()}</div>
        </div>
        <p>{review.body}</p>
        <h5>{review.reviewer_name}</h5>
        <h6>{review.date}</h6>
      </div>
      <div>

      </div>
    </div>
  );
}