import React from 'react';

export default function ReviewTile({ review }) {
  const starRater = () => {
    let stars = '';
    for (let i = 0; i < review.rating; i += 1) {
      stars += '*';
    }
    return stars;
  };

  const dateConverter = (dateString) => {
    const date = new Date(dateString);
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  return (
    <div className="review-tile-main-container">
      <div>
        <div className="review-tile-container">
          <div className="review-tile-summary">{review.summary}</div>
          <div className="review-tile-stars">{starRater()}</div>
        </div>
        <p>{review.body}</p>
        <div className="review-tile-container">
          <div className="review-tile-name">{review.reviewer_name}</div>
          <div className="review-tile-date">{dateConverter(review.date)}</div>
        </div>
      </div>
    </div>
  );
}
