import React, { useState, useEffect } from 'react';
import ReviewImageModal from './ReviewImageModal.jsx';

export default function ReviewTile({ review }) {
  const [modalToggle, setModalToggle] = useState(false);
  const [imgString, setImgString] = useState('');
  const [showFull, setShowFull] = useState(false);
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

  const nameAndDate = `${getDateString(review.date)}, ${review.reviewer_name}`;
  const summaryLengthChecker = () => {
    if (review.summary.length > 60) {
      return `${review.summary.substring(0, 60)} ...`;
    }
    return review.summary;
  };
  const elipsesSpan = () => (
      <span onClick={() => setShowFull(true)}>
        {showFull ? review.body : '...'}
      </span>
  );
  const bodyLengthChecker = () => {
    if (review.body.length > 250) {
      return `${review.body.substring(0, 250)}`;
    }
    return review.body;
  };
  const imgToggler = (pic) => {
    setModalToggle(!modalToggle);
    setImgString(pic);
  };
  const photoHandler = () => {
    if (review.photos.length > 0) {
      const photoAltTxt = `Image for review titled ${review.summary}`;
      return review.photos.map((element) => (
        <img
          src={element.url}
          alt={photoAltTxt}
          key={element.id}
          className="review-tile-individual-photo"
          onClick={()=>imgToggler(element.url)}
        />
      ));
    }
  };
  useEffect(() => {
    if (review.body.length < 250) {
      setShowFull(true);
    }
  });

  return (
    <div className="review-tile-main-container">{console.log(review.photos)}
      <div>
        <div className="review-tile-container-1">
          <div className="review-tile-nameAndDate">{nameAndDate}</div>
          <div className="review-tile-stars">{starRater()}</div>
        </div>
        <div className="review-tile-summary">{summaryLengthChecker()}</div>
        <p className="review-tile-body">
          {bodyLengthChecker()}
          {showFull ? review.body.substring(250) : elipsesSpan()}
        </p>
        <div className="review-tile-photos-container">{photoHandler()}</div>
        <div className="review-tile-container-2">
          <div className="review-tile-name">{review.reviewer_name}</div>
          <div className="review-tile-date">{getDateString(review.date)}</div>
          <div>
            {modalToggle
            && <ReviewImageModal imgString={imgString} setModalToggle={setModalToggle} />}
          </div>
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
