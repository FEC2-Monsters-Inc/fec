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
    <div className = "review-tile-main-container">
      <div>
        <div className="review-tile-container">
          <div className="review-tile-summary">{review.summary}</div>
          <div className="review-tile-stars">{starRater()}</div>
        </div>
        <p >{review.body}</p>
        <div className="review-tile-container">
          <div className="review-tile-name">{review.reviewer_name}</div>
          <div className="review-tile-date">{dateConverter(review.date)}</div>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
}