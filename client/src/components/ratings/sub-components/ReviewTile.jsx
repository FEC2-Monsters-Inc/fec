import React from 'react';

export default function ReviewTile({ review }) {
  const starRater = () => {
    let stars = '';
    for (let i = 0; i < review.rating; i += 1) {
      stars += '*';
    }
    return stars;
  };

  const getDateString = (dateString) => {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${monthName} ${day}, ${year}`;
  };

  return (
    <div className="review-tile-main-container">
      <div>
        <div className="review-tile-container-1">
          <div className="review-tile-summary">{review.summary}</div>
          <div className="review-tile-stars">{starRater()}</div>
        </div>
        <p>{review.body}</p>
        <div className="review-tile-container-2">
          <div className="review-tile-name">{review.reviewer_name}</div>
          <div className="review-tile-date">{getDateString(review.date)}</div>
        </div>
      </div>
    </div>
  );
}

{/* <div className="review-tile-summary">{review.summary}</div> */}

// TO-DO:
// Combine username and date into 1 string.
// place this new string where summary is
// move summary to its own container below container-1
// Check to see what "recommended" means for review tile
// check to see what "response" means for tile...likely both from metadata
// add helpful? Yes(numHelpful) | report buttons
