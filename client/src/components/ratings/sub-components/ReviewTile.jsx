import React from 'react';

export default function ReviewTile({review}) {

  const starRater = function() {
    var stars = '';
    for (var i = 0; i < review.rating; i++) {
      stars += '*';
    }
    return stars;
  };

  const dateConverter = function(dateString) {
    let date = new Date(dateString);
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  return (
    <div>
      <div>
        <div style={{display: 'flex'}}>
          <div style={{fontWeight: 'bold'}}>{review.summary}</div>
          <div style={{marginLeft: '20px'}}>{starRater()}</div>
        </div>
        <p style={{fontStyle: 'italic'}}>{review.body}</p>
        <div style={{display: 'flex'}}>
          <div style={{fontSize: '12px', textDecoration: 'underline'}}>{review.reviewer_name}</div>
          <div style={{marginLeft: '20px'}}>{dateConverter(review.date)}</div>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
}